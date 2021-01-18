import styled from '@emotion/styled';

export const CommaDelimitedUnorderedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: inline-block;

    :not(:last-of-type):after {
      margin-right: 2px;
      content: ',';
    }
  }
`;
