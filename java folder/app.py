# app.py
import streamlit as st
from io import BytesIO
import tempfile
import os
import re
import json
import time
import base64

# pip libraries: PyPDF2, docx2txt, openai
import PyPDF2
import docx2txt
import openai

# ---------- CONFIG ----------
openai.api_key = os.getenv("OPENAI_API_KEY")  # Set this before running
LLM_MODEL = "gpt-4o-mini"  # change if needed
SUMMARY_MAX_TOKENS = 400
EXPLAIN_MAX_TOKENS = 120
TEMPERATURE = 0.15

# ---------- UI Setup ----------
st.set_page_config(page_title="LegalSimple — AI Legal Simplifier", layout="wide")
st.title("LegalSimple — AI Legal Document Simplifier")
st.markdown("Upload a legal PDF or DOCX and get a plain-English summary, highlighted clauses, and a quick risk score.")

# ---------- Utility functions ----------
def extract_text_from_pdf_bytes(file_bytes):
    text_pages = []
    try:
        reader = PyPDF2.PdfReader(BytesIO(file_bytes))
        for p in range(len(reader.pages)):
            ptext = reader.pages[p].extract_text()
            if ptext:
                text_pages.append(ptext)
    except Exception as e:
        st.warning("PDF extraction warning: " + str(e))
    return "\n".join(text_pages)

def extract_text_from_docx_bytes(file_bytes):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
        tmp.write(file_bytes)
        tmp.flush()
        tmp_name = tmp.name
    try:
        txt = docx2txt.process(tmp_name)
    finally:
        try:
            os.unlink(tmp_name)
        except:
            pass
    return txt or ""

def clean_text(t):
    t = re.sub(r'\r', '\n', t)
    t = re.sub(r'\n{2,}', '\n\n', t)
    return t.strip()

# Clause detection keywords (expand if needed)
RISK_KEYWORDS = {
    "liability": ["liability", "indemnif", "hold harmless", "limitation of liability"],
    "termination": ["terminate", "termination", "breach", "notice period", "notice"],
    "fees": ["fee", "charges", "penalt", "late payment", "interest"],
    "confidentiality": ["confidential", "non-disclosure", "nda", "proprietary"],
    "warranty": ["warrant", "represent", "guarantee"],
    "refund": ["refund", "return", "cancellation"],
    "arbitration": ["arbitrat", "dispute", "jurisdiction", "governing law"],
}

def find_clause_snippets(text, window=250, max_per_type=5):
    found = {}
    lowered = text.lower()
    for cat, kws in RISK_KEYWORDS.items():
        snippets = []
        for kw in kws:
            for m in re.finditer(re.escape(kw), lowered):
                start = max(0, m.start() - window)
                end = min(len(text), m.end() + window)
                snippet = text[start:end].strip()
                snippets.append(snippet)
        # dedupe while preserving order
        uniq = []
        seen = set()
        for s in snippets:
            key = s[:200]
            if key not in seen:
                uniq.append(s)
                seen.add(key)
            if len(uniq) >= max_per_type:
                break
        if uniq:
            found[cat] = uniq
    return found

def heuristic_risk_score(clauses_found):
    score = 0
    reasons = []
    # simple weighted scoring -- tune if needed
    weights = {
        "fees": 2,
        "liability": 2,
        "termination": 1,
        "warranty": 1,
        "confidentiality": 1,
        "arbitration": 1,
        "refund": 1,
    }
    for cat in clauses_found:
        w = weights.get(cat, 1)
        score += w
        reasons.append(f"{cat.title()} clause(s) detected.")
    if score >= 4:
        return "High", reasons
    if score >= 2:
        return "Medium", reasons
    return "Low", reasons

# LLM calls
def call_llm_summary(document_text):
    # short/truncated doc to avoid token issues
    truncated = document_text[:3500]
    prompt = f"""
You are an assistant that converts legal text into a concise plain-English summary for a non-expert.
Constraints:
- Keep summary <= 150 words.
- Add 3 short bullet points listing the top 3 critical clauses (one sentence each).
- Add a single-line 'Note: This is an automated summary, not legal advice.'
- Provide a one-line short reason for a risk label like: "Risk: Medium — reason..."
Input:
\"\"\"{truncated}\"\"\"
Output in plain text format.
"""
    try:
        resp = openai.ChatCompletion.create(
            model=LLM_MODEL,
            messages=[{"role":"user","content":prompt}],
            temperature=TEMPERATURE,
            max_tokens=SUMMARY_MAX_TOKENS,
        )
        return resp.choices[0].message["content"].strip()
    except Exception as e:
        st.error("LLM summary error: " + str(e))
        return None

def call_llm_explain_clause(clause_snippet):
    prompt = f"""
Explain this legal clause snippet in 1-2 short plain-English sentences and add 1 practical watch-out for a user.
Clause:
\"\"\"{clause_snippet}\"\"\"
"""
    try:
        resp = openai.ChatCompletion.create(
            model=LLM_MODEL,
            messages=[{"role":"user","content":prompt}],
            temperature=TEMPERATURE,
            max_tokens=EXPLAIN_MAX_TOKENS,
        )
        return resp.choices[0].message["content"].strip()
    except Exception as e:
        return "LLM explain error: " + str(e)

# ---------- Main flow ----------
uploaded = st.file_uploader("Upload a legal document (PDF or DOCX)", type=["pdf","docx"])
col1, col2 = st.columns([2,1])

if uploaded:
    with st.spinner("Reading file and extracting text..."):
        raw_bytes = uploaded.read()
        text = ""
        if uploaded.type == "application/pdf" or uploaded.name.lower().endswith(".pdf"):
            text = extract_text_from_pdf_bytes(raw_bytes)
        else:
            # docx
            text = extract_text_from_docx_bytes(raw_bytes)
        text = clean_text(text)

    if not text or len(text) < 30:
        st.error("Could not extract meaningful text. Try another file or paste the text in the box below.")
    else:
        st.success("Text extracted.")
        # show basic preview
        with col1:
            st.subheader("Document preview (first 1200 chars)")
            st.text_area("Doc preview", value=text[:1200], height=220)
        with col2:
            st.subheader("Quick actions")
            if st.button("Generate Summary & Analysis"):
                st.session_state["doc_text"] = text
                st.session_state["timestamp"] = time.time()

        # perform analysis (either immediately if button pressed or cache)
        do_analysis = st.session_state.get("doc_text") == text or st.button("Force analyze now")
        if do_analysis:
            doc_text = st.session_state.get("doc_text", text)
            st.info("Generating AI summary (this may take a few seconds)...")
            summary = call_llm_summary(doc_text)
            clauses = find_clause_snippets(doc_text)
            risk_label, reasons = heuristic_risk_score(clauses)

            st.markdown("---")
            st.header("AI Summary")
            if summary:
                st.write(summary)
            else:
                st.write("No summary available.")

            st.markdown("---")
            st.header("Detected key clauses & explanations")
            if clauses:
                for cat, snippets in clauses.items():
                    st.subheader(cat.title())
                    for i, s in enumerate(snippets):
                        key = f"{cat}_{i}"
                        st.markdown(f"**Snippet {i+1}:**")
                        st.write(s[:800] + ("..." if len(s)>800 else ""))
                        # explain button per snippet
                        if st.button(f"Explain {cat} snippet {i+1}", key=key):
                            with st.spinner("Asking AI to explain clause..."):
                                explanation = call_llm_explain_clause(s)
                                st.write(explanation)
            else:
                st.write("No common clauses detected by keyword scan.")

            st.markdown("---")
            st.header("Quick Risk Score")
            st.metric("Risk Level", risk_label)
            if reasons:
                for r in reasons:
                    st.write("- " + r)

            # Downloadable simplified summary file
            st.markdown("---")
            st.subheader("Downloadable outputs")
            summary_text = (summary or "") + "\n\n" + "Generated by LegalSimple (automated). Not legal advice."
            b = summary_text.encode("utf-8")
            st.download_button("Download summary (TXT)", data=b, file_name="legal_simplified_summary.txt", mime="text/plain")

            # prepare a simplified DOCX-like text for download as .txt (easy)
            simplified_doc = "LEGAL SIMPLE SUMMARY\n\n" + summary_text + "\n\n" + "Highlighted Clauses (snippets):\n"
            for cat, snippets in clauses.items():
                simplified_doc += f"\n== {cat.title()} ==\n"
                for s in snippets:
                    simplified_doc += s + "\n---\n"
            st.download_button("Download simplified document (TXT)", data=simplified_doc.encode("utf-8"), file_name="legal_simplified_doc.txt", mime="text/plain")

            # show sample risk rationale
            st.markdown("---")
            st.subheader("Transparency: why this risk label?")
            st.write("The risk label is heuristically computed from presence of penalties, indemnity/liability clauses, termination and short-notice clauses.")
            st.write("Detected clause categories: " + ", ".join(clauses.keys()) if clauses else "None")

# fallback area to paste raw text if file extraction fails
st.markdown("---")
st.subheader("Or paste legal text directly (if upload/extraction fails)")
plain = st.text_area("Paste document text here", height=160)
if plain and st.button("Analyze pasted text"):
    st.session_state["doc_text"] = clean_text(plain)
    st.experimental_rerun()

# small footer
st.markdown("---")
st.markdown("**Note:** This tool provides automated summaries for demo/education. Not a substitute for professional legal advice.")
