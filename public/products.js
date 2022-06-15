const socket = io.connect()

const render = (data) => {
    const html = data.map((product) => {
        
        return (`
                <div id= "${product.id}"class="card mx-1 d-flex align-items-center" style="width: 10rem;">
                    <img src= ${product.tumbnail} class="card-img-top" style="width: 50%;" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title"> ${product.name} </h5>
                        <p class="card-text"> ${product.price} </p>
                    </div>
                </div> 
                `
        )
    }).join('')
    document.getElementById('productsContainer').innerHTML = html
}

socket.on('products', data => {
    render(data);
  });

  const addProduct = () => {
    const product = {
        name: document.getElementById('formName').value,
        price: document.getElementById('formPrice').value,
        tumbnail: document.getElementById('formTumbnail').value
        
    };
    console.log(1)
    socket.emit('new-product', product);
  }
  
  const element = document.getElementById('formDescription')
  
  element.addEventListener('submit', (e) =>{
    e.preventDefault()
    addProduct()
  })