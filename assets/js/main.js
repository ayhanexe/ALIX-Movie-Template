$(document).ready(function() {
    
    let duration = 350;
    
    let mini_slider_opts = {
        99999: {
            items:6,
            height:"250px"
        },
        1100: {
            items:6,
            height:"220px"
        },
        980: {
            items:7,
            height:"170px"
        },
        860: {
            items:7,
            height:"150px"
        },
        780: {
            items:7,
            height:"130px"
        },
        700: {
            items:6,
            height:"140px"
        },
        650: {
            items:6,
            height:"130px"
        },
        570: {
            items:5,
            height:"140px"
        },
        510: {
            items:4,
            height:"150px"
        },
        450: {
            items:3,
            height:"160px"
        }
    }
    let film_opts = {
        99999: {
            items:4,
            height:"270px"
        },
        1200: {
            items:4,
            height:"250px"
        },
        1160: {
            items:4,
            height:"220px"
        },
        1030: {
            items:3,
            height:"280px"
        },
        960: {
            items:3,
            height:"260px"
        },
        920: {
            items:3,
            height:"240px"
        },
        860: {
            items:3,
            height:"220px"
        },
        780: {
            items:3,
            height:"200px"
        },
        720: {
            items:4,
            height:"200px"
        },
        670: {
            items:3,
            height:"240px"
        },
        620: {
            items:3,
            height:"210px"
        },
        560: {
            items:3,
            height:"190px"
        },
        510: {
            items:2,
            height:"260px"
        },
        460: {
            items:2,
            height:"230px"
        },
        430: {
            items:2,
            height:"210px"
        }
    }
    
    let container = $(".mini-slider-content");
    let mini_slider_interval;
    let mini_slider_duration = 5000;
    let current = calculateScreen();
    let slider_prev = $(".mini-slider-prev");
    let slider_next = $(".mini-slider-next");
    let mini_slider_left = 0;
    
    mini_slider_interval = setInterval(mini_slider_next, mini_slider_duration);
    
    function mini_slider_resize() {
        let slider_width = $(".mini-slider-container").width();
        for(let a = 0; a < Object.keys(mini_slider_opts).length; a++) {
            let paddings = parseInt($(".content-container").css("padding-left")) + parseInt($(".content-container").css("padding-right"));
            if(($(window).width() + paddings) - 30 < Object.keys(mini_slider_opts)[a]) {
                
                screenTotal = mini_slider_opts[Object.keys(mini_slider_opts)[a]].items;
                
                $(".mini-slider-item").css({
                    "width": ((slider_width - (mini_slider_opts[Object.keys(mini_slider_opts)[a]].items) * 10) / mini_slider_opts[Object.keys(mini_slider_opts)[a]].items) + "px"
                });
                
                $(".mini-slider-container").css({
                    "height": mini_slider_opts[Object.keys(mini_slider_opts)[a]].height
                });
                
                return false;
                
            }
        }
    }
    mini_slider_resize();
    
    function film_resize(){
        for(let a = 0; a < Object.keys(film_opts).length; a++) {
            let content_container = $(".film-content");
            let paddings = parseInt($(".film").css("padding-left")) + parseInt($(".film").css("padding-right"));
            if(($(window).width() + paddings) < Object.keys(film_opts)[a]) {
                console.log(Object.keys(film_opts)[a]);
                let margins = parseInt($(".film").css("margin-left")) + parseInt($(".film").css("margin-right")) + 5;
                $(".film").css({
                    "width":($(content_container).width() / film_opts[Object.keys(film_opts)[a]].items) - margins + "px",
                    "height":film_opts[Object.keys(film_opts)[a]].height
                })
                break;
            }
        }
    }
    film_resize();
    
    $(window).on("resize", () => {
        mini_slider_resize();
        film_resize();
        clearInterval(mini_slider_interval);
        current = calculateScreen();
        mini_slider_left = 0;
        $(container).css({
            "left":`${mini_slider_left}px`
        });
        mini_slider_interval = setInterval(mini_slider_next, mini_slider_duration);
    });
    
    function calculateScreen() {
        for(let a = 0; a < Object.keys(mini_slider_opts).length; a++) {
            if((($(".content-container").width() + parseInt($(".content-container").css("padding-left"))) + parseInt($(".content-container").css("padding-right"))) < Object.keys(mini_slider_opts)[a]) {
                return mini_slider_opts[Object.keys(mini_slider_opts)[a]].items;
            }
        }
    }
    
    function mini_slider_next() {
        let total = $(".mini-slider-item").length;
        
        if(current < total) {
            let margins = parseInt($(".mini-slider-item").css("margin-left")) + parseInt($(".mini-slider-item").css("margin-right"));
            mini_slider_left = mini_slider_left - ($(".mini-slider-item").width() + margins);
            $(container).css({
                "left":mini_slider_left + "px"
            });
            current++;
        } else {
            current = calculateScreen();
            mini_slider_left = 0;
            $(container).css({
                "left":`${mini_slider_left}px`
            });
        }
    }
    
    function mini_slider_prev() {
        
        let total = $(".mini-slider-item").length;
        let min = calculateScreen();
        let margins = (parseInt($(".mini-slider-item").css("margin-left")) + parseInt($(".mini-slider-item").css("margin-right")));
        
        if(current > min && current <= total) {
            clearInterval(mini_slider_interval);
            mini_slider_left = mini_slider_left + $(".mini-slider-item").width() + margins;
            $(container).css({
                "left":mini_slider_left + "px"
            });
            current--;
            mini_slider_interval = setInterval(mini_slider_next, mini_slider_duration);
        }
        
        else if(current == min) {
            clearInterval(mini_slider_interval);
            mini_slider_left = -($(".mini-slider-item").width() * (total - current)) - (margins * (total - current));
            $(container).css({
                "left":mini_slider_left + "px"
            });
            current = total;
            mini_slider_interval = setInterval(mini_slider_next, mini_slider_duration);
        }
    }
    
    $(slider_prev).click(function() {
        mini_slider_prev()
    });
    
    $(slider_next).click(function() {
        clearInterval(mini_slider_interval);
        mini_slider_next();
        mini_slider_interval = setInterval(mini_slider_next, mini_slider_duration);
    });
    
    
    
    // Theme Change Button
    $(".header-theme-changer").click(function() {
        if(!$("body").hasClass("dark")) {
            theme_mode("dark");
        } else {
            theme_mode("light");
        }
    });
    
    // Header Dropbox Show/Hide System
    $(".header-menu-item.category-item").click(function(e) {
        
        let dropbox = $(this).children(".menu-item-category");
        
        if($(dropbox).hasClass("hide")) {
            
            $(".menu-item-category").each((i, e) => {
                if($(e).hasClass("show")) {
                    $(e).removeClass("show")
                        .animate({
                            "opacity":0
                        }, duration, () => {
                            $(e).addClass("hide");
                        });
                }
            });
            
            $(dropbox).removeClass("hide")
                      .animate({
                          "opacity":1
                      }, duration, () => {
                          $(dropbox).addClass("show");
                      });
                      
        }
        
        else {
            $(dropbox).removeClass("show")
                    .animate({
                        "opacity":0
                    }, duration, () => {
                        $(dropbox).addClass("hide");
                    });
        }
        
        e.preventDefault();
        return false;
    });
    
    function closeDropdown() {
        let dropdown = $(".menu-item-category");
        $(dropdown).each((i, e) => {
            $(e).removeClass("show")
                .animate({
                    "opacity":0
                }, 150, () => {
                    $(e).addClass("hide");
                });
        });
    }
    
    $(window).click((e) => {
        closeDropdown();
    });
    
    $(".no-drag").on("dragstart", function(e) {
        e.preventDefault();
    });
    
    $(".info-button").click(function(e) {
        let info = $(this).parents(".film").children(".film-description");
        if(!$(info).hasClass("active")) {
            $(".film-description").removeClass("active");
            $(info).addClass("active");
        } else {
            $(info).removeClass("active");
        }
        e.preventDefault();
    })
    
    $(".robot-submit").click(function(e) {
        let error = true;
        let labels = $(this).parents(".film-robot").find("label");
        
        $(labels).each((i, e) => {
            if($(e).find("input[type=hidden].aurora-control").val() != "none") {
                error = false;
            }
        });
        
        if(error) {
            e.preventDefault();
        }
    })
    
})