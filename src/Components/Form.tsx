import React, { ChangeEvent } from "react";
import { TextInput, Dropdown, Button } from "react-materialize";
import { sections } from "../utils/api";
import "materialize-css";

interface FormProps {
  handleSubmit: () => void;
  inputValue: string;
  isSearching: boolean;
  sectionValue: string;
  setKeywords: (keywords: string) => void;
  setSection: (section: string) => void;
}

export const Form = ({
  handleSubmit,
  inputValue,
  isSearching,
  sectionValue,
  setKeywords,
  setSection,
}: FormProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeywords(value);
  };
  const handleSectionClick = (section: string) => {
    setSection(section);
  };

  return (
    <form name="search" style={{ padding: "10px" }}>
      <TextInput
        id="TextInput-4"
        label="ENTER KEYWORDS, PICK A SECTION, AND HIT SEARCH"
        onChange={handleInputChange}
        value={inputValue}
      />
      <div style={{ display: "inline-block", marginRight: "10px" }}>
        <Dropdown
          id="Dropdown_6"
          options={{
            alignment: "left",
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,

            coverTrigger: true,
            hover: false,
            inDuration: 150,
            outDuration: 250,
          }}
          trigger={<Button node="button">{`Section (${sectionValue})`}</Button>}
        >
          {sections.map((section) => (
            <Button
              flat
              node="button"
              waves="light"
              key={section}
              onClick={() => handleSectionClick(section)}
            >
              {section.toUpperCase()}
            </Button>
          ))}
        </Dropdown>
      </div>
      <Button
        disabled={inputValue.length === 0 || isSearching}
        onClick={handleSubmit}
      >
        Search
      </Button>
    </form>
  );
};
