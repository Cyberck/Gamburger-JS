
let product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        amount: 0,
        kcall: 500,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        amount: 0,
        kcall: 1100,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        amount: 0,
        kcall: 1500,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    }
}


// Доп продукция

let extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 100
    },
    lettuce: {
        name: 'Салатный лист',
        price: 2000,
        kcall: 30
    },
    cheese: {
        name: 'Сыр',
        price: 2500,
        kcall: 150
    }
}



let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptBtn = document.querySelector('.receipt__window-btn');



btnPlusOrMinus.forEach(function (item) {
    item.addEventListener('click', function () {
        plusOrMinus(this);
    })
})

function plusOrMinus(element) {
    // closest() - подключаеться к ближайшему заданому родителю
    // getAttribute() - берет значение у указаного атрибута
    let parentId = element.closest('.main__product').getAttribute('id'),
        out = element.closest('.main__product').querySelector('.main__product-num'),
        price = element.closest('.main__product').querySelector('.main__product-price span'),
        kcall = element.closest('.main__product').querySelector('.main__product-kcall span');

    if(element.getAttribute('data-symbol') == '+') {
        product[parentId].amount++
    }else if(element.getAttribute('data-symbol') ==  '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }
    
    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

for(let i = 0; i < checkExtraProduct.length;i++) {
    checkExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this);
    })
}

function addExtraProduct(el) {
    let parent = el.closest('.main__product'),
        parentId = parent.getAttribute('id');
        
    product[parentId][el.getAttribute('data-extra')] = el.checked;

    let kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span'),
        elDataInfo = el.getAttribute('data-extra');

    if(product[parentId][elDataInfo] == true) {
        product[parentId].price += extraProduct[elDataInfo].price;
        product[parentId].kcall += extraProduct[elDataInfo].kcall;
    }else {
        product[parentId].price -= extraProduct[elDataInfo].price;
        product[parentId].kcall -= extraProduct[elDataInfo].kcall;
    }

    kcall.innerHTML = product[parentId].Kcall;
    price.innerHTML = product[parentId].Summ;

}

let arrProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;

addCart.addEventListener('click', function() {
    for(let key in product) {
        let productobj = product[key];
        if(productobj.amount > 0) {
            arrProduct.push(productobj);
            for(let newKey in productobj) {
                if(productobj[newKey] === true) {
                    // '\n' - экранирование наше след значение начинает с новой строки
                    productobj.name += '\n' + extraProduct[newKey].name
                }
            }
        }
        productobj.price = productobj.Summ;
        productobj.kcall = productobj.Kcall;
    }

    for(let i = 0; i < arrProduct.length;i++) {
        let el = arrProduct[i];
        totalName += '\n' + el.name + '\n';
        totalPrice += el.price;
        totalKcall += el.kcall;
    }

    receiptOut.innerHTML = `Ваш заказ: \n ${totalName} \nКаллорийность ${totalKcall} \nСумма покупки ${totalPrice}сумм`;

    receipt.style.display = 'flex';
    setTimeout(() => receipt.style.opacity = '1', 100);
    setTimeout(() =>  receiptWindow.style.top = '0',200);
   
    let outNum = document.querySelectorAll('.main__product-num'),
        outPrice = document.querySelectorAll('.main__product-price span'),
        outKcall = document.querySelectorAll('.main__product-kcall span');

    for(let i = 0; i < outNum.length;i++) {
        outNum[i].innerHTML = 0;
        outPrice[i].innerHTML = 0;
        outKcall[i].innerHTML = 0;
    }
})


receiptBtn.addEventListener('click', () => {
    location.reload();
})



let i = 0;

let mono = document.querySelector('.header__timer-extra');

function rek() {    
if(i < 100) {
    i++
    mono.innerHTML = i;
}else if (mono.innerHTML = 100) {
    mono.style.fontSize = '150px'    
}   

    setTimeout(() => rek(), 100);  

}
rek();





