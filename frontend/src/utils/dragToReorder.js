// frontend/src/assets/dragToReorder.js

const TweenLite = window.TweenLite;
const Draggable = window.Draggable;

const dragToReorder = (container, items) => {
  const rowSize = items[0].offsetHeight; // Container height / number of items
  const total = items.length;

  TweenLite.to(container, 0.5, { autoAlpha: 1 });

  const changeIndex = (item, to) => {
    // Change position in the array
    arrayMove(sortables, item.index, to);

    // Change element's position in DOM
    if (to === total - 1) {
      container.appendChild(item.element);
    } else {
      const i = item.index > to ? to : to + 1;
      container.insertBefore(item.element, container.children[i]);
    }

    // Set index for each sortable
    sortables.forEach((sortable, index) => sortable.setIndex(index));
  };

  const Sortable = (element, index) => {
    const draggerEl = element.querySelector(".dragger");
    const content = element.querySelector(".itemContent");
    const order = element.querySelector('input[name="item_order"]');
    const form = element.querySelector('form');

    const animation = TweenLite.to(content, 0.3, {
      paused: true,
    });

    const dragger = new Draggable(element, {
      onRelease: upAction,
      onDrag: dragAction,
      trigger: draggerEl,
      type: "y",
    });

    const sortable = {
      dragger,
      element,
      index,
      setIndex,
    };

    TweenLite.set(element, { y: index * rowSize });

    function setIndex(index) {
      sortable.index = index;
      order.value = index + 1;

      if (!dragger.isDragging) layout();
    }

    function dragAction() {
      const index = clamp(Math.round(this.y / rowSize), 0, total - 1);

      if (index !== sortable.index) {
        changeIndex(sortable, index);
      }
    }

    function upAction() {
      animation.reverse();
      layout();
      form.requestSubmit();
    }

    function layout() {
      TweenLite.to(element, 0.3, { y: sortable.index * rowSize });
    }

    return sortable;
  };

  const sortables = items.map(Sortable);

  function arrayMove(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

  function clamp(value, a, b) {
    return value < a ? a : value > b ? b : value;
  }
};

export default dragToReorder;