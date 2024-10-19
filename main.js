document.title = "Portofolio";

const imageClick = document.getElementById("image_click");
const navigation = document.getElementById("navigation");
const home = document.querySelector(".My_container_home");
const header = document.getElementById("shadow_on_of");

// how to make of validate input this web site my

const handleClickImage = (show) => (show ? (imageClick.style.display = "flex") : (imageClick.style.display = "none"));

window.onscroll = function () {
  if (window.scrollY > 22) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

function handleHamburgerMenu() {
  if (navigation.style.display === "flex") {
    navigation.style.display = "none";
  } else {
    navigation.style.display = "flex";
  }
}

function navigationLoad() {
  if (navigation.style.display === "flex") {
    navigation.style.display = "none";
  } else {
    navigation.style.display = "flex";
    window.location.reload();
  }
}
//deklarasi variable
const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const phoneEl = document.querySelector("#phone");
const messageEl = document.querySelector("#message");
const inputs = document.querySelectorAll("input");
const textarea = document.querySelectorAll("textarea");
const form = document.querySelector("#myForm");

//validasi wajib diiisi
const isRequired = (value) => !!value;
//fungsi bettwen
const isBetween = (length, min, max) => !(length < min || length > max);

//tampilkan error
const showError = (input, message) => {
  //ambil form dari element
  const formField = input.parentElement;
  //add error class
  formField.classList.remove("success");
  formField.classList.add("error");

  //tampilkan error message
  const error = formField.querySelector("small");
  error.innerText = message;
};

//tampilkan success
const showSuccess = (input) => {
  //ambil form dari field element
  const formField = input.parentElement;

  //remove error class
  formField.classList.remove("error");
  formField.classList.add("success");

  //hide error mesage
  const error = formField.querySelector("small");
  error.innerText = "";
};

//cek username
const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const username = usernameEl.value.trim();
  if (!isRequired(username)) {
    showError(usernameEl, "Username harus diisi");
  } else if (!isBetween(username?.length, min, max)) {
    showError(usernameEl, `Username minimal ${min} karakter dan maksimal ${max} karakter`);
  } else {
    showSuccess(usernameEl);
    valid = true;
  }

  return valid;
};

//validasi email
const isEmailValid = (email) => {
  const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email harus diisi");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email tidak valid");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

//validasi phone

const isPhoneSecure = (phone) => {
  const regex = /^[^a-zA-Z]|(\+62|62)?(\+1|1)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;
  return regex.test(phone);
};

const chekPhone = () => {
  let valid = false;
  const min = 10,
    max = 15;
  const phone = phoneEl.value.trim();
  if (!isRequired(phone)) {
    showError(phoneEl, "phone harus diisi");
  } else if (!isPhoneSecure(phone) || !isBetween(phone.length, min, max)) {
    showError(phoneEl, `Number minimal ${min} and maximal number ${max}`);
  } else {
    showSuccess(phoneEl);
    valid = true;
  }
  return valid;
};

const checkMessage = () => {
  let valid = false;
  const message = messageEl.value.trim();
  if (!isRequired(message)) {
    showError(messageEl, "message harus diisi");
  } else {
    showSuccess(messageEl);
    valid = true;
  }

  return valid;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (checkUsername() && checkEmail() && chekPhone() && checkMessage()) {
    (function () {
      emailjs.init("gNalHzQs8C60twNnD");
    })();

    const params = {
      sendername: usernameEl.value,
      senderemail: emailEl.value,
      senderphone: phoneEl.value,
      message: messageEl.value,
    };

    const serviceID = "service_jot85ep";
    const templateID = "template_6qlp24a";

    inputs.forEach((input) => (input.value = ""));
    textarea.forEach((textarea) => (textarea.value = ""));

    try {
      const res = await emailjs.send(serviceID, templateID, params);
      console.log(res) && alert("<< Form telah terkirim >>");
    } catch (error) {
      alert(error, "<< Invalid to send this form >>");
    }
    return false;
  }
});

const debonce = (fn, delay = 500) => {
  let timoutId;
  return (...args) => {
    if (timoutId) {
      clearTimeout(timoutId);
    }
    timoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debonce((e) => {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "phone":
        chekPhone();
        break;
      case "message":
        checkMessage();
        break;
    }
  })
);
