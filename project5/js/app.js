/*jslint indent:2*/
/*global console,$,document,localStorage*/
function documentReady() {

    'use strict';

    var list;
    // Function for saving list in HTML5 local storage
    function getInnerHTML() {
        list = ($('.list').html());
        localStorage.setItem('list', list);
    }

    console.log(localStorage.list);

    if (localStorage.list) {
        $('.list').html(localStorage.list);
        $('.completed-list').find('input').attr("checked", true);
    }

    $(".to-do-list, .completed-list").sortable({
        connectWith: ".sortable"
    }).disableSelection(function () {
        getInnerHTML();
    });

    $('h2').find('button').click(function () {
        $('.modal-form').removeClass('hide');
        getInnerHTML();
    });

    // Date picker for modal form
    $(".due-date").datepicker();

    // Function for adding new item to to-do list
    function appendNewItem(title, description, dueDate) {
        // Append Item to list
        $('.to-do-list').append('<li class="ui-sortable-handle"><input type="checkbox" name="isCompleted"><h4 class="item-title">' + title + '</h4><p class="item-due-date">' + dueDate + '</p><p class="item-description">' + description + '</p><div class="item-functions"><p class="delete-item"><span class="ui-icon ui-icon-circle-close"></span>Delete</p></div></li>');
        getInnerHTML();
    }

    function editCurrentItem(title, description, dueDate) {

        getInnerHTML();
    }

    // Function for Creating a new Item
    $('.create-new-item').click(function () {
        var title, description, dueDate;
        // Grab values from form
        title = $('input.item-title').val();
        description = $('input.item-description').val();
        dueDate = "Due Date: " + $('input.due-date').val();

        // Hide Form
        $('.modal-form').addClass('hide');

        appendNewItem(title, description, dueDate);

        // Reset form values
        $('.modal-form').find('input').val('');
        documentReady();
        getInnerHTML();
    });

    $('.cancel-new-item').click(function () {
        $('.modal-form').addClass('hide');
        $('.modal-form').find('input').val('');
        getInnerHTML();
    });

    // Delete Item from list
    $('.delete-item').click(function () {

        var item = this.closest('li');
        $(".confirm-delete").dialog({
            resizable: false,
            height: 180,
            modal: true,
            buttons: {
                Cancel: function () {
                    $(this).dialog("close");
                },
                "Delete Item": function () {
                    $(this).dialog("close");
                    $(item.closest('li')).hide('slide', 200);
                }
            }
        });
        getInnerHTML();
    });

    // Function for editing items
    // Delete Item from list
    $('p.edit-item').click(function () {
        console.log('testing click');
        var title, description, dueDate, item;
        console.log(this);
        item = $(this).closest('li')[0];
        console.log(item);
        console.log($(item).find('.list-item-title'));
        title = item.children[1].innerText;
        description = item.children[3].innerText;
        dueDate = item.children[2].innerText;

        $('.modal-form').removeClass('hide');
        $('.modal-form').find('.item-title').val(title)
        $('.modal-form').find('.item-description').val(description)
        $('.modal-form').find('.due-date').val(dueDate)

        $('.create-new-item').addClass('.edit-current-item');
        $('.edit-current-item').removeClass('.create-new-item');

        getInnerHTML();
    });

    // Function for sending checked items to completed list
    $("input").on('click', function () {
        $('.to-do-list').find('input:checked').closest('li').appendTo('.completed-list');
        $('.completed-list').find('input:not(:checked)').closest('li').appendTo('.to-do-list');
        getInnerHTML();
    });

    getInnerHTML();

}
$(document).ready(function () {
    'use strict';

    // Ready document while allowing document to be readied again
    documentReady();
});
