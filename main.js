const button = document.querySelector('button')




button.addEventListener('click', getFetch)

function getFetch() {

    const barcode = document.querySelector('input').value
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode.toString()}.json`
  
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data.product)
            const nutriments = data.product.nutriments
            const calories = data.product.nutriments['energy-kcal']
            const productName = data.product['product_name']
            const proteinValue = data.product.nutriments['proteins_value']
            const carbValue = data.product.nutriments['carbohydrates_value']
            const fatValue = data.product.nutriments['fat_value']

            if (calories === undefined || calories === NaN || nutriments === undefined){
                document.querySelector('#productName').innerHTML = 'Sorry, Product Not Found.'  
            }else{
            document.querySelector('#productImg').src = data.product['image_front_thumb_url']
            document.querySelector('#productName').innerHTML = productName
            document.querySelector('#calories').innerText = Math.floor(calories) + ' Calories p/100g/ml'
            document.querySelector('#protein').innerText = Math.floor(proteinValue) + ' % Protein'
            document.querySelector('#fat').innerText = Math.floor(fatValue) + ' % Fats'
            document.querySelector('#carbs').innerText = Math.floor(carbValue) + ' % Carbs'
            console.log(data.product)
            }
            
            document.querySelector('input').value = ''
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
       
}

