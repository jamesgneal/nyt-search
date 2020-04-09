import React, { ChangeEvent, FormEvent } from "react";
import { sections } from "../utils/api";

interface FormProps {
  handleSubmit: () => void;
  inputValue: string;
  isSearching: boolean;
  selectValue: string;
  setKeywords: (keywords: string) => void;
  setSection: (section: string) => void;
}

export const Form = ({
  handleSubmit,
  inputValue,
  isSearching,
  selectValue,
  setKeywords,
  setSection,
}: FormProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setKeywords(value);
  };
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setSection(value);
  };
  const handleEventAndSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={handleEventAndSubmit} name="search">
      <label>
        Keywords:
        <input
          name="keywords"
          onChange={handleInputChange}
          placeholder="Article Subject"
          value={inputValue}
        />
      </label>
      <br />
      <label>
        Section:
        <select
          name="section"
          onChange={handleSelectChange}
          value={selectValue}
        >
          {sections.map((section) => (
            <option value={section} key={section}>
              {section.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
      <br />
      <input
        type={"submit"}
        value={"Search"}
        disabled={inputValue.length === 0 || isSearching}
      />
    </form>
  );
};
