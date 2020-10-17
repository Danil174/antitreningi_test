import React, { useState, useEffect } from 'react';
import { Chip } from '@material-ui/core';

const Category = () => {
  const [chipData, setChipData] = useState([
    { selected: false, label: 'Еда' },
    { selected: false, label: 'Одежда' },
    { selected: false, label: 'Алкоголь' },
  ]);

  const [newCategory, setNewCategory] = useState(``);

  useEffect(() => {
    console.log(chipData);
  }, [chipData]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.label !== chipToDelete.label));
  };

  const handleChipClick = (clickedChip) => () => {
    setChipData((chips) => chips.map(it => it.label === clickedChip.label ? { ...it, selected: !clickedChip.selected } : it ));
  };

  const handleBtnClick = () => {
    if (newCategory !== ``) {
      setChipData((chips) => [...chips, { selected: false, label: newCategory }]);
      setNewCategory(``);
    }
  };

  return (
    <div className="category">
      <ul className="category__list">
        {chipData.map((chip, i) => {
          return (
            <li
              key={`${i}${chip.label}`}
              className="category__item"
            >
              <Chip
                label={chip.label}
                color={chip.selected ? 'secondary' : 'primary'}
                onDelete={handleDelete(chip)}
                onClick={handleChipClick(chip)}
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
