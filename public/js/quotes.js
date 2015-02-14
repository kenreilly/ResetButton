var quotes = [];
var $quotesTable;
var $addModal;
var $editModal;
var $deleteModal;

(function ($) {

    $quotesTable = $(".table > tbody");
    $.ajax({ url: "quotes.json" }).done(populateTable);

    $addModal = $("#addModal").modal({ show: false });
    $editModal = $("#editModal").modal({ show: false });
    $deleteModal = $("#deleteModal").modal({ show: false });

    $(".btn-save", $addModal)[0].onclick = onAdd;
    $(".btn-save", $editModal)[0].onclick = onEdit;
    $(".btn-warning", $deleteModal)[0].onclick = onDelete;
    $("#addNewButton")[0].onclick = onClickAdd;
})(jQuery);

function onGetQuotes(result) {
    quotes = result.quotes;
    populateTable();
}

function populateTable(result) {
    quotes = result;
    $quotesTable.empty();

    for (var i = 0, ii = quotes.length; i != ii; ++i) {
       
        var data = quotes[i];
        var row = document.createElement("tr");
                
        var tdAuthor = document.createElement("td");
        tdAuthor.innerHTML = data.author;
        row.appendChild(tdAuthor);

        var tdQuote = document.createElement("td");
        tdQuote.innerHTML = data.quote;
        row.appendChild(tdQuote);

        var tdEdit = document.createElement("td");
        var editButton = document.createElement("button");
        editButton.classList.add("btn-default");
        editButton.dataset['index'] = i;
        editButton.innerHTML = "Edit";
        editButton.onclick = onClickEdit.bind(editButton);
        tdEdit.appendChild(editButton);
        row.appendChild(tdEdit);

        var tdDelete = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("btn-default");
        deleteButton.dataset['index'] = i;
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = onClickDelete.bind(deleteButton);
        tdDelete.appendChild(deleteButton);
        row.appendChild(tdDelete);

        $quotesTable.append(row);
    }
}

function onClickAdd() {
    $("#inputAuthor", $addModal)[0].value = "";
    $("#inputQuote", $addModal)[0].value = "";
    $addModal.modal("show");
}

function onClickEdit() {
    var index = this.dataset.index;
    var author = quotes[index].author;
    var quote = quotes[index].quote;

    $("#inputAuthor", $editModal)[0].value = author;
    $("#inputQuote", $editModal)[0].value = quote;
    $(".btn-save", $editModal)[0].dataset['index'] = index;
    $editModal.modal("show");
}

function onClickDelete() {
    var index = this.dataset.index;
    var author = quotes[index].author;
    var quote = quotes[index].quote;

    $(".quoteAuthor", $deleteModal)[0].innerText = author;
    $(".quoteBody", $deleteModal)[0].innerText = quote;
    $(".btn-warning", $deleteModal)[0].dataset['index'] = index;
    $deleteModal.modal("show");
}

function onAdd() {
    var index = this.dataset.index;
    var author = $("#inputAuthor", $addModal)[0].value;
    var quote = $("#inputQuote", $addModal)[0].value;
    
    quotes.push({ author: author, quote: quote});
    saveQuotes();
    $addModal.modal("hide");
}

function onEdit() {
    var index = this.dataset.index;
    var author = $("#inputAuthor", $editModal)[0].value;
    var quote = $("#inputQuote", $editModal)[0].value;

    quotes[index].author = author;
    quotes[index].quote = quote;
    saveQuotes();
    $editModal.modal("hide");
}

function onDelete() {
    var index = this.dataset.index;
    quotes.splice(index, 1);
    saveQuotes();
    $deleteModal.modal("hide");
}

function saveQuotes() {
    $.ajax( {
        type: "POST",
        url: "saveQuotes", 
        data: { quotes: quotes }
    }).done(function () {
        $.ajax({ url: "quotes.json" }).done(populateTable);
    });
}