import React, {ChangeEvent, useState} from 'react';
import Autosuggestion from 'react-autosuggest';
import axios from 'axios';

interface Show {
  show: {
    id: number;
    name: string;
  };
}

const SearchBar: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [suggestionsList, setSuggestionsList] = useState<Show[]>([]);

  const getSuggestions = async (inputValue: string) => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${inputValue}`);
      const data: Show[] = response.data;
      setSuggestionsList(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const onSuggestionsFetchRequested = ({value}: { value: string }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, {newValue}: { newValue: string }) => {
    setValue(newValue);
  };

  const getSuggestionValue = (suggestion: Show) => suggestion.show.name;

  const renderSuggestion = (suggestion: Show) => (
    <div>
      {suggestion.show.name}
    </div>
  );

  const inputProps = {
    className: 'form-control',
    placeholder: 'Введите название сериала',
    value,
    onChange,
  };

  return (
    <Autosuggestion
      suggestions={suggestionsList}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default SearchBar;
