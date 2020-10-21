import React, { useState } from 'react';
import { Chip } from '@material-ui/core';

const Category = ( { categories, handleChange } ) => {
  const [newCategory, setNewCategory] = useState(``);

  const handleDelete = (it) => () => {
    handleChange(categories.slice().filter(item => item.label !== it.label));
  };

  const handleChipClick = (clickedItem) => () => {
    handleChange(categories.map(it => it.label === clickedItem.label ? { ...it, selected: !clickedItem.selected } : it ));
  };

  const handleBtnClick = () => {
    if (newCategory !== ``) {
      handleChange([...categories, { selected: false, label: newCategory }]);
      setNewCategory(``);
    }
  };

  if (categories.length === 0) {
    return <div>Категорий не найдено</div>;
  }

  return (
    <div className="category">
      <b>Фильтр по категории:</b>
      <ul className="category__list">
        {categories.map((category, i) => {
          return (
            <li
              key={`${category.label}${i}`}
              className="category__item"
            >
              <Chip
                label={category.label}
                color={category.selected ? 'secondary' : 'primary'}
                onDelete={handleDelete(category)}
                onClick={handleChipClick(category)}
              />
            </li>
          );
        })}
      </ul>
      <label className="category__add_category">
        <input
          placeholder="добавить категорию"
          className="category__input"
          type="text"
          value={newCategory}
          onChange={(evt) => setNewCategory(evt.target.value)}
        />
        <button
          className="category__add_btn"
          onClick={handleBtnClick}
        >
          <span>+</span>
        </button>
      </label>
    </div>
  );
};

export default Category;
