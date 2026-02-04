export const initialRegisterState = {
  firstName: '',
  lastName: '',
  username: '',
  city: '',
  state: '',
  zip: '',
  agree: false,
  submitted: false,
};

export function registerReducer(state, action) {
  switch (action.type) {
    case 'field_change': {
      return { ...state, [action.field]: action.value };
    }
    case 'toggle_agree': {
      return { ...state, agree: !state.agree };
    }
    case 'submit': {
      return { ...state, submitted: true };
    }
    case 'reset': {
      return { ...initialRegisterState };
    }
    default:
      return state;
  }
}

