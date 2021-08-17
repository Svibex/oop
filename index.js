let order = [];
let orderPrice = null;
let orderCalories = null;
let isPaid = false;
let orderPosition = 4; //номер позиции в заказе, если нужно удалить из заказа

function addOrderPosition (options) {
    switch (options.name) {
        case 'hamburger':
            order.push(new Hamburger(options));
            break;
        case 'salad':
            order.push(new Salad(options));
            break;
        case 'drink':
            order.push(new Drink(options));
            break;
    }
}

//функция удаления позиции из заказа
function deleteOrderPosition (positionNumber) {
    return order = order.filter(function (item, index) {
        if(index !== positionNumber) return item;
    });
}

function calcOrderPrice (order) {
    for(let i=0; i<order.length; i++) {
        orderPrice += +order[i].getPrice();
    }
    return orderPrice;
}

function calcOrderCalories (order) {
    for(let i=0; i<order.length; i++) {
        orderCalories += +order[i].getCalories();
    }
    return orderCalories;
}

function paidOrder() {
    isPaid = true;
    Object.freeze(order);
    // console.log(`Order is frozen: ${Object.isFrozen(order)}`);
}

class OrderPosition {
    constructor(options) {
        this.name = options.name;
    }
    getName() {
        return this.name;
    }
}

class Hamburger extends OrderPosition {
    constructor(options) {
        super(options);
        this.stuffing = options.stuffing;
        this.size = options.size;
        this.SIZES = [{size: 'small', price: '50', calories: '20'}, {size: 'large', price: '100', calories: '40'}];
        this.STUFFINGS = [{stuffing: 'cheese', price: '10', calories: '20'},
            {stuffing: 'salad', price: '20', calories: '5'},
            {stuffing: 'potato', price: '15', calories: '10'}
        ];
    }
    getPrice() {
        return +this.SIZES.find(item => item.size === this.size).price + +this.STUFFINGS.find(item => item.stuffing === this.stuffing).price;
    }
    getCalories() {
        return +this.SIZES.find(item => item.size === this.size).calories + +this.STUFFINGS.find(item => item.stuffing === this.stuffing).calories;
    }
    getSize() {
        return this.size;
    }
    getStuffing() {
        return this.stuffing;
    }
}

class Salad extends OrderPosition {
    constructor(options) {
        super(options);
        this.type = options.type;
        this.weight = options.weight;
        this.TYPES = [{type: 'olivier', price: '50', calories: '80'}, {type: 'caesar', price: '100', calories: '20'}];
        this.SERVING_WEIGHT = 100;
    }
    getPrice() {
        return +this.TYPES.find(item => item.type === this.type).price*this.weight/this.SERVING_WEIGHT;
    }
    getCalories() {
        return +this.TYPES.find(item => item.type === this.type).calories*this.weight/this.SERVING_WEIGHT;
    }
}

class Drink extends OrderPosition {
    constructor(options) {
        super(options);
        this.type = options.type;
        this.TYPES = [{type: 'cola', price: '50', calories: '40'}, {type: 'coffee', price: '80', calories: '20'}];
    }
    getPrice() {
        return +this.TYPES.find(item => item.type === this.type).price;
    }
    getCalories() {
        return +this.TYPES.find(item => item.type === this.type).calories;
    }
}

// пример заказа
let newOrder = [{name: 'drink', type: 'cola'},
    {name: 'salad', type: 'caesar', weight: '200'},
    {name: 'hamburger', size: 'small', stuffing: 'cheese'},
    {name: 'hamburger', size: 'large', stuffing: 'salad'},
    {name: 'drink', type: 'coffee'}
];

for(let i=0; i<newOrder.length;i++) {
    addOrderPosition (newOrder[i]);
}

deleteOrderPosition(orderPosition);

paidOrder();

console.log(`Order price: ${calcOrderPrice(order)}`);
console.log(`Order calories: ${calcOrderCalories(order)}`);
// console.log('Order: ', order);