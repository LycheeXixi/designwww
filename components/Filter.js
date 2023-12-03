
import styles from '../styles/filter.module.css';
import React, { useState, useRef } from "react";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleApply = () => {
    console.log("Selected Filter:", selectedFilter);
    setIsOpen(false); // Close the dropdown after applying
  };

  const handleClickLightPlan = () => {
    setSelectedFilter("Light plan");
    setIsOpen(false); // Close the dropdown
  };

  const handleClickLoosePlan = () => {
    setSelectedFilter("Loose plan");
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className={styles.filter}>
      {/* Use an icon as the button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.filter__iconButton}
      >
        <img
          src={isOpen ? '/filteropen.svg' : '/filterclose.svg'}
          alt="Filter Icon"
        />
      </button>

      {isOpen && (
        <div ref={dropdownRef} className={styles.filter__dropdown}>
          <div style={{ paddingTop: "0.2em", paddingBottom: "2em" }}>
            Plan your schedule
          </div>

          <div className={styles.filter__dropdown__actions}>
            <button onClick={handleClickLightPlan} className={styles.filter__dropdown_button}>
              Light plan
            </button>
            <button onClick={handleClickLoosePlan} className={styles.filter__dropdown_button}>
              Loose plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
