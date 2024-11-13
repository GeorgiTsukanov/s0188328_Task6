function updatePrice() {
    // Находим select по имени в DOM.
    let s = document.getElementsByName("prodType");
    let select = s[0];
    let price = 0;
    let prices = getPrices();
    let priceIndex = parseInt(select.value) - 1;
    if (priceIndex >= 0) {
      price = prices.prodTypes[priceIndex];
    }
    
    let radioDiv = document.getElementById("radios");
    let checkDiv = document.getElementById("checkboxes");

    if (select.value == "1") {
        checkDiv.style.display = "none";
        radioDiv.style.display = "none";
        resetRadios();
        resetCheckboxes();
    } else if (select.value == "2") {
        checkDiv.style.display = "none";
        radioDiv.style.display = "block";
        resetCheckboxes();
    } else {
        checkDiv.style.display = "block";
        radioDiv.style.display = "none";
        resetRadios();
    }

    let radios = document.getElementsByName("prodOptions");
    radios.forEach(function(radio) {
      if (radio.checked) {
        let optionPrice = prices.prodOptions[radio.value];
        if (optionPrice !== undefined) {
          price += optionPrice;
        }
      }
    });
    
    let checkboxes = document.querySelectorAll("#checkboxes input");
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        let propPrice = prices.prodProperties[checkbox.name];
        if (propPrice !== undefined) {
          price += propPrice;
        }
      }
    });

    let prodPrice = document.getElementById("res");
    let amount = document.getElementById('amount');
    if (amount.value.match(/^[1-9]\d*$/) === null) {
        prodPrice.innerHTML = "введены неверные значения количества";
    }
    else{
        prodPrice.innerHTML = price*amount.value + " рублей";
    }
  }
  

  function resetRadios() {
    let radios = document.getElementsByName("prodOptions");
    radios.forEach(function(radio) {
        radio.checked = false;
    });
}

function resetCheckboxes() {
    let checkboxes = document.querySelectorAll("#checkboxes input");
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

  function getPrices() {
    return {
      prodTypes: [150, 10000, 12000],
      prodOptions: {
        option1: 0,
        option2: 1000,
        option3: 1700,
      },
      prodProperties: {
        prop1: 1000,
        prop2: 750,
      }
    };
  }
  
  window.addEventListener('DOMContentLoaded', function (event) {
    let s = document.getElementsByName("prodType");
    let select = s[0];
    select.addEventListener("change", function(event) {
      updatePrice();
    });
      
    let radios = document.getElementsByName("prodOptions");
    radios.forEach(function(radio) {
      radio.addEventListener("change", function(event) {
        updatePrice();
      });
    });

    let inputs = document.querySelectorAll("input");
    inputs.forEach(function(input) {
        input.addEventListener("change", function(event) {
            updatePrice();
        });
    });
  
    let checkboxes = document.querySelectorAll("#checkboxes input");
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener("change", function(event) {
        updatePrice();
      });
    });
  
    updatePrice();
  });
  
