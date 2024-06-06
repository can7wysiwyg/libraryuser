export const addItem = (item, next) => {
    let book = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("book")) {
            book = JSON.parse(localStorage.getItem("book"));
        }
        book.push({
            ...item,
            count: 1
        });

        book = Array.from(new Set(book.map(p => p._id))).map(id => {
            return book.find(p => p._id === id);
        });

        localStorage.setItem("book", JSON.stringify(book));

        next();
    }
};


export const getCart = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("book")) {
            return JSON.parse(localStorage.getItem("book"));
        }
    }
    return [];
};


export const itemTotal = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("book")) {
            return JSON.parse(localStorage.getItem("book")).length;
        }
    }
    return 0;
};

export const removeItem = bookId => {
    let book = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            book = JSON.parse(localStorage.getItem("book"));
        }

        book = book.filter(book => book._id !== bookId);

        localStorage.setItem("book", JSON.stringify(book));
    }
};

export const emptyCart = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("book");
        next();
    }
};