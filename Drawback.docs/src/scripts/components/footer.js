document.getElementById("contato-link").addEventListener("click", function(event){
    event.preventDefault(); // Previne o comportamento padrão do link
    document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
});