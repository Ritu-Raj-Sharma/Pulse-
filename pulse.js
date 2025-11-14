var theme = ""
const toggle = document.getElementById('toggle');

window.addEventListener('load', ()=>{

});
  
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