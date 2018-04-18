const state = {
    funds: 10000,
    stocks: []
};

const mutations = {
    'BUY_STOCK' (state, {stockId, quantity, stockPrice}) { // es6 'destructuring'
        // Check if stock exists in stocks-array
        const record = state.stocks.find(element => {
            return element.id === stockId;
        });

        if (record ){
            record.quantity += quantity;
        } else {
            state.stocks.push({
                id: stockId,
                quantity: quantity
            });
        }

        // Update funds
        state.funds -= stockPrice * quantity;
    },
    'SELL_STOCK' (state, {stockId, quantity, stockPrice}) {
        const record = state.stocks.find(element => element.id === stockId);

        // Check if record.quantity is greater then quantity to sell, update record quantity
        if (record.quantity > quantity) {
            record.quantity -= quantity;
        } else {
            // Remove if more or exactly what is able
            state.stocks.splice(state.stocks.indexOf(record), 1);
        }

        state.funds += stockPrice * quantity;
    }
};

const actions = {
    sellStock({commit}, order) {
        commit('SELL_STOCK', order);
    }
};

const getters = {
    stockPortfolio (state, getters) {
        // Access stocks on stocks-module to find name and price
        // Use `map` to transform all elements in the array
        return state.stocks.map(stock => {
            // getters refer to the overal store getters
            const record = getters.stocks.find(element => element.id === stock.id);
            
            // Transform each element in the portfolio stocks-array to a new object 
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            }
        });
    },
    funds (state) {
        return state.funds;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}