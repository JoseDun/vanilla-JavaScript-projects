class Products {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const divElement = document.createElement("div");
    divElement.classList.add("card","text-center","mb-4");
    divElement.innerHTML = `
        <div class="card-body">
            <strong>Product name</strong>: ${product.name}
            <strong>Product price</strong>: ${product.price}
            <strong>Product year</strong>: ${product.year}
            <a href="#" class="btn btn-danger" name="delete">Delete</a>
        </div>

        `;
    productList.appendChild(divElement);
  }
  resetForm() {
    document.getElementById("product-form").reset();
  }
  deleteProduct(element) {
    if (element.name === "delete") element.parentElement.parentElement.remove()
    this.showMessage('Borrado con exito','info')
  }
  showMessage(message,typeColor) {
    let div = document.createElement('div')
    div.className = `alert alert-${typeColor} mt-4`
    div.appendChild(document.createTextNode(message))
    let container = document.querySelector('.container')
    let app = document.getElementById('app')
    container.insertBefore(div,app)
    setTimeout(()=>{
      document.querySelector('.alert').remove()
    },900)

  }
}

//* Eventos del Dom

const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", (e) => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const year = document.getElementById("year").value;
  console.log(name, price, year);
  const product = new Products(name, price, year);
  console.log(product);

  const ui = new UI();
  ui.addProduct(product);
  ui.resetForm();
  ui.showMessage('Agregado con exito','success')
  e.preventDefault();
});

const deleteButton = document.getElementById("product-list");
deleteButton.addEventListener("click", (e) => {
  let ui = new UI();
  ui.deleteProduct(e.target);
});
