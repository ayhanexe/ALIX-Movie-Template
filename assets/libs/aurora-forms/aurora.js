$(document).ready(function() {
    
    $('.aurora-control').on('focus', function() {
        aurora_focus(this)
    })
    
    $('.aurora-control').on('blur', function() {
        aurora_focusout(this)
    })
    
    $('.password-icon').on('click', function() {
        if($(this).parent().find('.aurora-control').prop('type') == 'password') {
            $(this).addClass('eye-active')
            $(this).parent().find('.aurora-control').prop('type', 'text')
            $(this).parent().find('.aurora-control').addClass('fake-text-input')
        } else {
            $(this).removeClass('eye-active')
            $(this).parent().find('.aurora-control').prop('type', 'password')
        }
        return false
    })
    
    $(".select-container").click(function() {
        $('.option-container').height(0);
        if($(this).find('.option-container').height() === 0) {
            if($(this).find(".option-container").data("max") != undefined) {
                let data = parseInt($(this).find(".option-container").data("max"));
                let size = $($(this)[0].firstElementChild).height() * $($(this).find('.option-container').children()).length + 5;
                
                if(size > data) {
                    $(this).find('.option-container').css({
                        "height":data + "px",
                        "overflow-y":"auto"
                    });
                }
            } else {
                $(this).find('.option-container').css({
                    'height': $($(this)[0].firstElementChild).height() * $($(this).find('.option-container').children()).length + 5 + "px"
                })
            }
        } else {
            $(this).find('.option-container').css("height", 0);
        }
    })
    
    $('.option').click(function() {
        $(this).parent().children().removeClass('active-option')
        $(this).addClass('active-option')
        $(this).closest('.aurora-select').find('input.aurora-control').val($(this).data("value")).parent().find('.select-text').text($(this).text())
        $(this).closest(".select-container").click()
    })
    
    $('.option-container').click(function() {
        return false;
    })
    
    $('.aurora-label').each(function(index, label) {
        if($(label).data('aurora-type')){
            if($(this).data('aurora-type') === 'image') {
                $(this).on('change', function() {
                    const img = $(this).find('input[type=file].aurora-control').prop('files')[0];
                    imageSelected(img, this)
                }).on('click', function(e) {
                    if(e.target == this) {
                        return false;
                    }
                })
            }
        } else {
            if($(label).hasClass('aurora-file')){
                $(label).find('input[type=file].aurora-control').on('change', function() {
                    fileInputChanged(this)
                });
            }
        }
    })
    
    $('.reset-file').click(function() {
        $(this).parents('label.aurora-file').find('input[type=file].aurora-control').prop('files')[0] = '';
        $(this).parents('label.aurora-file').removeClass('file-selected').find('input[type=file].aurora-control').val('').parent().find('.file-name').text('')
        return false;
    })
    
    $(".aurora-reset").click(function(e) {
        let labels = $(".aurora-label");
        
        $(labels).each((i, e) => {
            
            if($(e).hasClass("aurora-select")) {
                let input = $(e).children("input[type=hidden].aurora-control");
                let firstChild = $(e).children(".select-container").children(".option-container")[0].firstElementChild;
                $(e).children(".select-container").children(".option-container").children().each((i, e) => {
                    $(e).removeClass("active-option");
                });
                $(e).children(".select-container").children(".select-content").children(".select-text").text($(firstChild).text())
                $(input).val($(firstChild).data("value"));
                $(firstChild).addClass("active-option");
            }
            
            
        });
        
        
        e.preventDefault();
    })
    
    function init() {
        document.querySelectorAll(".aurora-select").forEach(function(element) {
            let firstText = $(element).find('.select-container').find('.option-container')[0].firstElementChild.innerText;
            let firstElement = $(element).find('.select-container').find('.option-container')[0].firstElementChild;
            $(element).find('input.aurora-control').val($($(element).find('.select-container').find('.option-container')[0].firstElementChild).data("value"))
            $(firstElement).addClass('active-option')
            $(element).find('.select-text').text(firstText)
        })
        document.querySelectorAll(".aurora-control").forEach(function(element) {
            if(element.value.length !== 0) {
                aurora_focus(element)
            }
        })
    }
    init()
    
    function aurora_focus(element) {
        $(element).parent().find('.aurora-placeholder').addClass('focused')
    }
    
    function aurora_focusout(element) {
        if(element.value.length === 0) {
            $(element).parent().find('.aurora-placeholder').removeClass('focused')
        }
    }
    
    function imageSelected(image, element) {
        if('File' in window && 'FileReader' in window && 'FileList' in window && 'Blob' in window) {
            let reader = new FileReader();
            reader.onload = function() {
                $(element).addClass('file-selected');
                $(element).find('.file').css({
                    'background':`url(${this.result}) no-repeat center`,
                    'background-size':'cover'
                })
            }
            reader.readAsDataURL(image)
        }
    }
    
    function fileInputChanged(element) {
        let text = '';
        for(let i = 0; i < element.files.length; i++) {
            text += element.files[i].name
            if(i != (element.files.length - 1)) {
                text += ", "
            }
        }
        $(element).parent('label.aurora-file').addClass('file-selected').find('.file-name').text(text).css('display', 'block')
    }
    
})