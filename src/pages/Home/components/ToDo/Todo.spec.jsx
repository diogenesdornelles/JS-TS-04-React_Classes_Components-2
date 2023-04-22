import { render, screen, it, test } from '@testing-library/react';
import ToDo from './ToDo';

describe('<ToDo />', () => {
  it('should has an input', () => {
    render(<ToDo />);
    const input = screen.findByTestId("input-todo");
    console.log(input);
  })
})