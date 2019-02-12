let callbackInit = $callback => {
    if ($callback && typeof $callback === "function") {
        $callback();
    }
};

let eventInit = ($event, $elem, $function) => {
    $elem.on($event, function() {
        callbackInit($function);
    });
};

const _fastsearchMethods = {
    getCurrentVal: $input => $input.val().toLowerCase(),

    filtration: ($items, $val, $valLength) => {
        $items.filter(function() {
            let _thisItem = $(this),
                name = _thisItem.text().toLowerCase(),
                nameSub = name.substr(0, $valLength);

            if (nameSub.includes($val)) {
                _thisItem.removeClass("--deactive");
            }
        });
    },

    filtrationInit: ($input, $items) => () => {
        let currentVal = _fastsearchMethods.getCurrentVal($input),
            currentValLength = currentVal.length;

        $items.addClass("--deactive");

        _fastsearchMethods.filtration($items, currentVal, currentValLength);
    }
};

let fastsearch = $container => {
    $container.each(function() {
        let _container = $(this),
            input = _container.find("[data-input]"),
            items = _container.find("[data-item]");

        eventInit(
            "input",
            input,
            _fastsearchMethods.filtrationInit(input, items)
        );
    });
};

fastsearch($("[data-fastsearch]"));
