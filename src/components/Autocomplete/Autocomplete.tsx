import React, {useState} from 'react';
import Autosuggestion, {SuggestionsFetchRequestedParams, InputProps} from 'react-autosuggest';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchShows, selectShows} from '../../app/showsSlice';

const Autocomplete: React.FC = () => {
  const dispatch = useDispatch();
  const shows = useSelector(selectShows);

  const [value, setValue] = useState<string>('');

  const getSuggestions = async (inputValue: string) => {
    setValue(inputValue);
    dispatch(fetchShows(inputValue));
  };

  const onSuggestionsFetchRequested = ({value}: SuggestionsFetchRequestedParams) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    dispatch(fetchShows(''));
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    {newValue}: { newValue: string }
  ) => {
    setValue(newValue);
  };

  const getSuggestionValue = (suggestion: string) => suggestion;

  const getSuggestionId = (id: number) => id;

  const renderSuggestion = (suggestion: string, id: number) => (
    <div className="list-group">
      <Link className="list-group-item list-group-item-action" to={`/shows/${id}`}>{suggestion}</Link>
    </div>
  );

  const inputProps: InputProps<string> = {
    placeholder: 'Введите название сериала',
    className: 'form-control mt-3',
    value,
    onChange,
  };

  return (
    <Autosuggestion
      suggestions={shows}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      getSuggestionId={getSuggestionId}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default Autocomplete;
