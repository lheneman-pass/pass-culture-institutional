import React from 'react'
import styled, { css } from 'styled-components'

import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { parseText } from '@/utils/parseText'

interface CenteredTextProps {
  title?: string
  description: string
}

export function CenteredText(props: CenteredTextProps) {
  return (
    <Root data-testid="centered-text">
      {props.title && <Typo.Heading2>{props.title}</Typo.Heading2>}
      <p aria-label={parseText(props.description).accessibilityLabel}>
        {parseText(props.description).processedText}
      </p>
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    text-align: center;
    --container-width: 52.5rem;

    h2 {
      margin-bottom: 1.5rem;
    }

    p {
      font-size: ${theme.fonts.sizes['4xl']};
      font-weight: ${theme.fonts.weights.semiBold};
      line-height: 2.75rem;

      @media (width < ${theme.mediaQueries.mobile}) {
        font-size: ${theme.fonts.sizes.xl};
        line-height: 1.75rem;
      }
    }
  `}
`
