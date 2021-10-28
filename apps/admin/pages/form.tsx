import { useForm, Controller, NestedValue, SubmitHandler } from 'react-hook-form';
import Autosuggest from 'react-autosuggest';

const suggestions = [
  {
    id: 1,
    name: 'Beer',
    unit: 'pint'
  }
];

function SuggestForm() {
  // react-hook-form setting
  const {
    handleSubmit,
    
    control
  } = useForm();

  const onSubmit = data => console.log(data);

  // react-autosuggestion setting

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Suggest...</legend>
        <Controller
          name="suggest"
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState
          }) => (
            <Autosuggest
              // required props
              suggestions={suggestions}
              onSuggestionsFetchRequested={}
              getSuggestionValue={}
              renderSuggestion={}
              inputProps={}
            />
          )}
        />
      </fieldset>
    </form>
  )
}

export default SuggestForm;