/**
 * Loads mobile recharge plans from MockAPI.io
 * For local testing, uses mockapi-plans.json in the same folder.
 * To use live API:
 *   1. Create a project on mockapi.io
 *   2. Add a 'plans' resource with the example data from mockapi-plans.json
 *   3. Replace the URL below with your endpoint (e.g., https://<your-project>.mockapi.io/api/v1/plans)
 */

let allPlans = []; // Store plans globally for easy access

async function loadPlans() {
  const plansContainer = document.getElementById("plans");
  plansContainer.innerHTML = "<p class='text-gray-500'>Loading plans...</p>";

  try {
    // For local testing: fetch from mockapi-plans.json
    // For live API: replace with your MockAPI endpoint
    const response = await fetch("./mockapi-plans.json");
    allPlans = await response.json();

    plansContainer.innerHTML = "";

    allPlans.forEach(plan => {
      const card = `
        <div class="bg-white shadow-md rounded-lg p-4 m-2 w-64">
          <h2 class="text-xl font-bold text-blue-600">₹${plan.price}</h2>
          <p class="text-gray-700 font-semibold">${plan.name}</p>
          <p class="text-gray-700">${plan.validity}</p>
          <p class="text-gray-700 text-sm">${plan.benefits}</p>
          <p class="text-sm text-gray-500">${plan.description}</p>
          <button onclick="selectPlan(${plan.id})"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Select
          </button>
        </div>
      `;
      plansContainer.innerHTML += card;
    });
  } catch (error) {
    plansContainer.innerHTML = "<p class='text-red-500'>Failed to load plans.</p>";
  }
}

function selectPlan(id) {
  // Find the selected plan from the loaded plans
  const plan = allPlans.find(p => p.id == id);
  
  if (plan) {
    document.getElementById("selectedPlan").innerHTML = `
      <div class="p-4 bg-green-100 rounded-lg">
        <h3 class="text-lg font-bold">${plan.name}</h3>
        <p><strong>Price:</strong> ₹${plan.price}</p>
        <p><strong>Validity:</strong> ${plan.validity}</p>
        <p><strong>Benefits:</strong> ${plan.benefits}</p>
        <p>${plan.description}</p>
        <button onclick="proceedToPayment(${plan.id}, '${plan.name}', ${plan.price})" class="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Proceed to Payment
        </button>
      </div>
    `;
  } else {
    document.getElementById("selectedPlan").innerHTML = "<p class='text-red-500'>Plan not found.</p>";
  }
}

function proceedToPayment(planId, planName, price) {
  document.getElementById("payment").innerHTML = `
    <div class="p-6 bg-yellow-50 rounded-lg border-2 border-yellow-400">
      <h2 class="text-2xl font-bold text-yellow-700 mb-4">Payment Confirmation</h2>
      <p class="text-lg mb-2"><strong>Plan:</strong> ${planName}</p>
      <p class="text-lg mb-4"><strong>Amount:</strong> ₹${price}</p>
      <div class="flex gap-2">
        <button onclick="confirmPayment('${planName}', ${price})" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Confirm Payment
        </button>
        <button onclick="cancelPayment()" class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
          Cancel
        </button>
      </div>
    </div>
  `;
}

function confirmPayment(planName, price) {
  document.getElementById("payment").innerHTML = `
    <div class="p-6 bg-green-50 rounded-lg border-2 border-green-400">
      <h2 class="text-2xl font-bold text-green-700">✓ Payment Successful!</h2>
      <p class="text-lg mt-2">You have successfully activated <strong>${planName}</strong> for <strong>₹${price}</strong>.</p>
      <p class="text-sm text-gray-600 mt-3">Your plan will be active shortly. Thank you!</p>
      <button onclick="resetPayment()" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Select Another Plan
      </button>
    </div>
  `;
}

function cancelPayment() {
  document.getElementById("payment").innerHTML = "";
}

function resetPayment() {
  document.getElementById("payment").innerHTML = "";
  document.getElementById("selectedPlan").innerHTML = "";
}

window.onload = loadPlans;