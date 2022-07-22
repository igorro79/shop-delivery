import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import styled from "styled-components";
import { useEffect } from "react";

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 10px 15px;
  border-radius: 5px;
`;

export const Autocomplite = function ({
  isLoaded,
  onSelect,
  passValue,
  reset,
}) {
  const {
    ready,
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });

  // ==== clear input after submit ======
  if (reset !== value) setValue("");
  //=====================================

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    passValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      passValue(description);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
        onSelect({ lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          style={{ borderBottom: "1px solid #000", padding: "5px 0" }}
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [init, isLoaded]);

  return (
    <div ref={ref}>
      <Input
        id="address"
        name="address"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Enter your address"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul
          style={{
            padding: "0",
            margin: "0",
          }}
        >
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};
