export const initialContactState = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  agree: false,
  submitted: false,
};

export function contactReducer(state, action) {
  switch (action.type) {
    case 'field_change':
      return { ...state, [action.field]: action.value };
    case 'toggle_agree':
      return { ...state, agree: !state.agree };
    case 'submit':
      return { ...state, submitted: true };
    case 'reset':
      return { ...initialContactState };
    default:
      return state;
  }
}

