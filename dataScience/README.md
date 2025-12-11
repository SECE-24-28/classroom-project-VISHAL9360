# DataShield: AI-Driven Sensitive Data Exposure Analyzer

🛡️ **An intelligent system that automatically detects, classifies, analyzes, and secures sensitive data within structured datasets (CSV/Excel).**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [AI/ML Features](#aiml-features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

DataShield is a comprehensive data science project that combines pattern recognition, machine learning, and data visualization to identify and analyze sensitive information exposure in datasets. The system operates entirely offline, ensuring data privacy and security.

### Problem Statement

In the era of massive data storage and sharing, sensitive information is often exposed unintentionally through files, logs, and datasets. Organizations face:

- **Data leaks** due to human error
- **Privacy breaches** under laws like GDPR and HIPAA
- **Lack of automated scanning tools** that work on local files securely

### Solution

DataShield provides an AI-powered local solution that can automatically:
- Detect sensitive data patterns (emails, phones, IPs, SSH keys, IBANs, credit cards)
- Classify exposure levels (Low/Medium/High)
- Predict exposure risk using machine learning
- Detect anomalous exposure patterns
- Visualize exposure analysis
- Encrypt and secure sensitive data

---

## ✨ Features

### Core Features

1. **User Authentication**
   - Secure login/signup with PBKDF2 password hashing
   - Password reset functionality
   - User-specific encryption keys

2. **Data Loading & Processing**
   - Load CSV/Excel files
   - Load encrypted files (.enc)
   - Data preview and cleaning
   - Export to CSV/Excel

3. **Sensitive Data Detection**
   - Row-level scanning for sensitive patterns
   - Support for: emails, phone numbers, SSN, credit cards, IPv4, IBAN, SSH keys
   - Total matches counting per record
   - Exposure level classification (Low/Medium/High)

4. **Encryption & Security**
   - Fernet encryption for files
   - Password-derived encryption keys
   - Secure key storage

5. **Visualization**
   - Exposure by category (bar charts)
   - Exposure level distribution (pie charts)
   - Total matches distribution (histograms)
   - Feature importance visualization
   - Custom charts (histogram, bar, line, pie)

6. **Reporting**
   - PDF report generation
   - EDA (Exploratory Data Analysis) reports
   - Exposure analysis summaries

### AI/ML Features

#### Feature 1: Sensitive Data Exposure Risk Prediction (Supervised ML)

**Goal**: Predict how risky or exposed a dataset/file is based on its contents.

**Process**:
- Uses exposure data (email_count, phone_count, credit_card_count, etc., and totalmatches)
- Creates exposure_level labels (Low/Medium/High)
- Trains classification models (RandomForest, XGBoost)
- Provides confidence scores for predictions

**Algorithms**:
- Random Forest Classifier
- XGBoost Classifier (optional)

**Output**:
- Predicted exposure level for each record
- Confidence scores
- Feature importance visualization
- Model accuracy and F1-score metrics

**Example**:
> "This file has a High Exposure Risk (0.92 confidence) due to multiple credit card and IBAN matches."

#### Feature 2: Anomaly Detection in Sensitive Data Patterns (Unsupervised ML)

**Goal**: Detect abnormal or suspicious data exposure patterns that don't follow the usual trend.

**Process**:
- Uses exposure counts (totalmatches, email_count, phone_count, etc.)
- Applies unsupervised learning algorithms
- Flags anomalous records

**Algorithms**:
- **IsolationForest**: Detects outliers in exposure patterns
- **K-Means**: Clusters data and flags outliers based on distance to cluster centers
- **DBSCAN**: Density-based anomaly detection

**Output**:
- Anomaly scores for each record
- Binary anomaly flag (is_anomaly)
- Cluster assignments (for K-Means and DBSCAN)
- Anomaly summary statistics

**Example**:
> "Detected 3 anomalous records with abnormally high exposure density."

---

## 🚀 Installation

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd dataScience
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

Or install manually:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn cryptography reportlab pillow openpyxl joblib
```

**Optional** (for XGBoost support):
```bash
pip install xgboost
```

### Step 3: Run the Application

```bash
python main.py/main.py
```

---

## 📖 Usage

### 1. Login/Signup

- Launch the application
- Sign up with a new username and password
- Login with your credentials
- **Note**: Your password is used to generate encryption keys - keep it safe!

### 2. Load Data

- Click **"Load File"** or use the File menu
- Select a CSV or Excel file
- The data will be displayed in the main table

### 3. Scan Sensitive Data

- Go to **AI Tools** → **Scan Sensitive Data (Row-Level)**
- The system will scan all rows and create exposure data
- Results include:
  - Counts for each sensitive data type
  - Total matches per record
  - Exposure level classification

### 4. Generate Exposure Analysis

- Go to **AI Tools** → **Generate Exposure Analysis**
- View visualizations:
  - Exposure by category (bar chart)
  - Exposure level distribution (pie chart)
  - Total matches distribution (histogram)

### 5. Train Exposure Risk Model (Feature 1)

- Go to **AI Tools** → **Feature 1: Train Exposure Risk Model**
- Select algorithm (RandomForest or XGBoost)
- Specify model save path
- Click **"Train Model"**
- View training metrics (accuracy, F1-score)

### 6. Predict Exposure Risk (Feature 1)

- Go to **AI Tools** → **Feature 1: Predict Exposure Risk**
- The system will predict exposure levels for all records
- View predictions with confidence scores
- Results are added to the dataset

### 7. View Feature Importance

- Go to **AI Tools** → **View Feature Importance**
- See which features contribute most to exposure risk prediction
- Visualize feature importance as a bar chart

### 8. Detect Exposure Anomalies (Feature 2)

- Go to **AI Tools** → **Feature 2: Detect Exposure Anomalies**
- Select algorithm (IsolationForest, K-Means, or DBSCAN)
- Set contamination rate (0.01 - 0.2)
- Set number of clusters (for K-Means)
- Click **"Detect Anomalies"**
- View anomalous records and statistics

### 9. Encrypt Data

- Go to **Security** → **Encrypt Current File**
- Enter your password
- Save the encrypted file (.enc)

### 10. Generate Reports

- Go to **Tools** → **Generate PDF Report**
- Or **AI Tools** → **Generate EDA Report**
- Save the report to a desired location

---

## 🧠 AI/ML Features Details

### Feature 1: Exposure Risk Prediction

**Model Training**:
- Input: Exposure counts (email_count, phone_count, credit_card_count, ipv4_count, iban_count, ssh_key_count, totalmatches)
- Output: Exposure level (Low/Medium/High)
- Algorithms: RandomForest, XGBoost
- Metrics: Accuracy, F1-score, Feature Importance

**Prediction**:
- Predicts exposure level for new records
- Provides confidence scores
- Adds predicted_exposure_level and exposure_confidence columns

### Feature 2: Anomaly Detection

**IsolationForest**:
- Detects outliers based on isolation
- Parameters: contamination rate
- Output: anomaly_score, is_anomaly

**K-Means**:
- Clusters data into groups
- Flags records far from cluster centers
- Parameters: n_clusters, contamination rate
- Output: cluster_id, anomaly_score, is_anomaly

**DBSCAN**:
- Density-based clustering
- Flags outliers as noise points
- Parameters: eps, min_samples
- Output: cluster_id, is_anomaly, anomaly_score

---

## 🏗️ Architecture

### System Flow

```
1. Data Ingestion
   ├── Load CSV/Excel
   ├── Load Encrypted Files
   └── Validate Structure

2. Data Preprocessing
   ├── Handle Missing Values
   ├── Remove Duplicates
   └── Normalize Formats

3. Sensitive Data Detection
   ├── Pattern Matching (Regex)
   ├── Row-level Scanning
   └── Exposure Level Classification

4. Risk Analysis & ML
   ├── Feature 1: Exposure Risk Prediction
   ├── Feature 2: Anomaly Detection
   └── Feature Importance Analysis

5. Visualization
   ├── Exposure by Category
   ├── Exposure Level Distribution
   └── Feature Importance Charts

6. Encryption & Protection
   ├── Fernet Encryption
   └── Secure Key Storage

7. Reporting
   ├── PDF Reports
   ├── EDA Reports
   └── Exposure Summaries
```

### Data Flow

```
Raw Data → Scan → Exposure Data → ML Models → Predictions → Visualizations → Reports
```

---

## 💻 Technologies Used

| Layer | Tools / Libraries | Purpose |
|-------|------------------|---------|
| **Frontend GUI** | Tkinter | User interface for data interaction |
| **Backend Processing** | Python | Core logic & integration |
| **Data Handling** | Pandas, NumPy, OpenPyXL | Data reading, cleaning, and transformation |
| **Visualization** | Matplotlib, Seaborn | Data exposure visualization |
| **Security** | Cryptography (Fernet) | File encryption and decryption |
| **ML/AI** | Scikit-learn, XGBoost | Machine learning models |
| **Pattern Detection** | Regex, re library | Pattern detection of sensitive data |
| **Reporting** | ReportLab | PDF report generation |
| **Image Processing** | PIL (Pillow) | Image handling for reports |

---

## 📊 Screenshots

### Login Screen
- Modern, colorful interface
- Secure authentication

### Main Dashboard
- Data preview table
- Colorful button controls
- Status bar

### Exposure Analysis
- Bar charts for exposure by category
- Pie charts for exposure level distribution
- Histograms for total matches

### Feature Importance
- Horizontal bar chart
- Shows which features contribute most to risk prediction

### Anomaly Detection
- Algorithm selection
- Contamination rate configuration
- Anomaly statistics

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🎓 Project Highlights

### Data Science Aspects

1. **Supervised Learning**: Exposure risk prediction using classification algorithms
2. **Unsupervised Learning**: Anomaly detection using clustering and isolation methods
3. **Feature Engineering**: Creating exposure features from raw data
4. **Model Evaluation**: Accuracy, F1-score, confusion matrices
5. **Feature Importance**: Understanding which features drive predictions
6. **Data Visualization**: Comprehensive exposure analysis charts

### Security Aspects

1. **Password Hashing**: PBKDF2 with 200,000 iterations
2. **Encryption**: Fernet symmetric encryption
3. **Key Derivation**: Password-based key derivation
4. **Offline Processing**: All data processing happens locally

### User Experience

1. **Colorful GUI**: Modern, intuitive interface
2. **Real-time Feedback**: Status updates and progress indicators
3. **Visual Analytics**: Rich visualizations and charts
4. **Comprehensive Reports**: PDF and Excel exports

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

## 🙏 Acknowledgments

- Scikit-learn for ML algorithms
- Pandas for data manipulation
- Matplotlib/Seaborn for visualization
- Cryptography library for security

---

**🛡️ Protect your data with DataShield - Where data analysis meets data protection!**

