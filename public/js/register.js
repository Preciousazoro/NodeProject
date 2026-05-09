    function togglePassword(id) {
      const input = document.getElementById(id);
      input.type = input.type === "password" ? "text" : "password";
    }

    function validateForm() {
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
      }

      return true;
    }

    const toast = document.querySelector(".toast");

    if (toast) {
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";

        setTimeout(() => {
          toast.remove();
        }, 300);
      }, 3000);
    }

    const addressInput = document.getElementById("address");
    const suggestionsBox = document.getElementById("suggestions");

    addressInput.addEventListener("input", async function () {
      const query = addressInput.value.trim();

      if (query.length < 3) {
        suggestionsBox.innerHTML = "";
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
        );

        const data = await response.json();

        suggestionsBox.innerHTML = "";

        data.slice(0, 5).forEach((place) => {
          const div = document.createElement("div");

          div.classList.add("suggestion-item");
          div.textContent = place.display_name;

          div.addEventListener("click", () => {
            addressInput.value = place.display_name;
            suggestionsBox.innerHTML = "";
          });

          suggestionsBox.appendChild(div);
        });
      } catch (error) {
        console.error("Address fetch error:", error);
      }
    });

    document.addEventListener("click", function (e) {
      const addressWrapper = document.querySelector(".address-wrapper");

      if (addressWrapper && !addressWrapper.contains(e.target)) {
        suggestionsBox.innerHTML = "";
      }
    });
