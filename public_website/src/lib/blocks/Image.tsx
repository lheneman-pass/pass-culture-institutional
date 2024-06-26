import React from 'react'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { getStrapiURL } from '@/utils/apiHelpers'
interface ImageProps {
  description?: string
  image: APIResponse<'plugin::upload.file'>
  alt: string
}

export function Imageblock(props: ImageProps) {
  return (
    <ContentWrapper>
      <Root>
        {props.image && (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getStrapiURL(props.image.data.attributes.url)}
              alt={props.alt}
              fetchPriority="low"
              loading="lazy"
              decoding="async"
            />
            <figcaption>{props.description}</figcaption>
          </figure>
        )}
      </Root>
    </ContentWrapper>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    padding: 0 8.5%;

    img {
      border-radius: 2.5rem;
      width: 100%;
      object-fit: cover;
    }

    figure {
      width: 100%;
      position: relative;

      display: flex;
      flex-direction: column;
      gap: 2rem;

      font-size: 15px;
      font-weight: 500;
      line-height: 1.6;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      background: none;
      gap: 1rem;
      padding: 0;

      img {
        width: 100%;
        border-radius: 1rem;
      }

      figure {
        gap: 1.5rem;
      }

      figcaption {
        width: 100%;
      }
    }
  `}
`
