var theme = ""
const toggle = document.getElementById('toggle');
let userData = {
  user1: {
    email: "rajr23698@gmail.com",
    password: "abcdefg",
    firstNmae: "Ritu Raj",
    lastName: "Sharma",
    weight: 70,
    height: 170,
    dob: "2001/01/29",
    calorie: 300,
    study: "none"
  },
  user2: {
    email: "rituraj@my.yorku.ca",
    password: "hijklmnop",
    firstNmae: "Ritu Raj",
    lastName: "Sharma",
    weight: 70,
    height: 170,
    dob: "2001/01/29",
    calorie: 300,
    study: "none"
  }
}
  
  toggle.addEventListener('change', changetheme);

  function changetheme(){
    if (toggle.checked) {
      theme = "dark";
      dark();
    } else {
      theme = "light";
      light();
    }
  }

  function bodytoggle(){
    document.getElementById("darklight").classList.toggle("light");
    document.getElementById("darklight").classList.toggle("dark");
  }
  function dark(){
    document.getElementById("logoimg").src="img/dark_logo.png";
    if( document.getElementById("heroimg")!=null)
    document.getElementById("heroimg").src = document.getElementById("heroimg").src.replace("light",theme);
    bodytoggle();
  }
  function light(){
    document.getElementById("logoimg").src="img/light_logo.png";
    if( document.getElementById("heroimg")!=null)
    document.getElementById("heroimg").src = document.getElementById("heroimg").src.replace("dark",theme);
    bodytoggle();
  }

  //overlay
  function openNav() {
    document.getElementById("myNav").style.height = "100%";
  }

  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }

  function logIn(){
    let match = false;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    for(let x in userData){
      if(userData[x]["email"]===email && userData[x]["password"]===password) match = true;
    }
    if(match){
      window.location.href = "activitylog.html"
    }else{
      var dispayError = document.getElementById("error");
      dispayError.style.display = "inline";
      dispayError.style.color = "red";
      dispayError.innerHTML = "Incorect username or password!";
    }
  }

  function signUn(){
    let match = false;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    for(let x in userData){
      if(userData[x]["email"]===email && userData[x]["password"]===password) match = true;
    }
    if(match){
      window.location.href = "activitylog.html"
    }else{
      var dispayError = document.getElementById("error");
      dispayError.style.display = "inline";
      dispayError.style.color = "red";
      dispayError.innerHTML = "Incorect username or password!";
    }
  }