import React from 'react'
import styled, { css } from 'styled-components'

import { ArrowRight } from '../icons/ArrowRight'
import { OutlinedText } from '../OutlinedText'
import { onClickAnalytics } from '@/lib/analytics/helpers'
import { Link } from '@/ui/components/Link'

type AccountItemProps = {
  color: string
  url: string
  emoji: string
  label: string
  eventName?: string
  eventOrigin?: string
}

export function AccountItem({
  color,
  url,
  emoji,
  label,
  eventName,
  eventOrigin,
}: AccountItemProps) {
  return (
    <StyledAccountItem>
      <Link
        href={url}
        onClick={() => onClickAnalytics({ eventName, eventOrigin })}>
        <StyledEmoji $color={color}>
          <OutlinedText dilationRadius={0} blurDeviation={1.5} shadow>
            {emoji}
          </OutlinedText>
        </StyledEmoji>
        <p>{label}</p>
        <ArrowRight />
      </Link>
    </StyledAccountItem>
  )
}

const StyledAccountItem = styled.li`
  ${({ theme }) => css`
    &[aria-hidden] {
      background-color: ${theme.colors.black};
      opacity: 0.2;
      height: 1px;
      width: 100%;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.875rem;
      &:hover {
        color: ${theme.colors.primary};
      }
      p {
        font-weight: ${theme.fonts.weights.semiBold};
        font-size: ${theme.fonts.sizes.l};
        flex-shrink: 0;
        max-width: 16ch;
      }

      @media (width < ${theme.mediaQueries.tablet}) {
        justify-content: start;
      }
    }
  `}
`

const StyledEmoji = styled.div<{ $color: string }>`
  ${({ theme, $color }) => css`
    background-color: ${$color};
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: ${theme.fonts.sizes['3xl']};
      transform: rotate(-6deg);
    }
  `}
`
