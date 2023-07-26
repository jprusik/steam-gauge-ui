import styled from '@emotion/styled';

export const DialogSection = styled.div`
  white-space: pre-line;
  color: rgba(255, 255, 255, 0.7);

  :not(:last-of-type) {
    margin-bottom: 30px;
  }

  a {
    text-decoration: none;

    :hover,
    :active,
    :focus-visible {
      text-decoration: underline;
    }
  }

  > div {
    margin: 1em 0;
  }

  > h3 {
    display: flex;
    align-items: normal;
    margin: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    line-height: 28px;
    font-size: 19px;

    > svg {
      margin-right: 4px;
      font-size: 24px;
    }
  }
`;
