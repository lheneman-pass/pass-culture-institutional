import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import { ButtonWithCTA } from '../buttonWithCTA/ButtonWithCTA'
import { ContentWrapper } from '../ContentWrapper'
import { OutlinedText } from '../OutlinedText'
import { CTA } from '@/types/CTA'
import { Offer } from '@/types/playlist'
import { Link } from '@/ui/components/Link'
import { Typo } from '@/ui/components/typographies'
import { getOfferUrl } from '@/utils/apiHelpers'

type OfferProps = {
  title: string
  description: string
  offers: Offer[]
  cta: CTA
  firstCartTitle: string
  secondCartTitle: string
  ctaCard: CTA
  descriptionCard: string
  firstIcon: string
  secondIcon: string
}

export function OfferSection({
  title,
  description,
  offers,
  cta,
  firstCartTitle,
  secondCartTitle,
  ctaCard,
  descriptionCard,
  firstIcon,
  secondIcon,
}: OfferProps) {
  offers = offers.filter((offer) => {
    return offer.image?.url && offer.image.url !== ''
  })
  return (
    <Root as="article">
      <Typo.Heading2>{title}</Typo.Heading2>
      <Typo.Body>{description}</Typo.Body>
      <StyledOfferWrapper>
        {offers.slice(0, 7).map((offer) => (
          <div key={offer.id}>
            <StyledLink href={getOfferUrl(offer.id)}>
              {offer.image?.url && (
                <StyledImage
                  src={offer.image.url}
                  alt={offer.name}
                  width={300}
                  height={200}
                />
              )}
            </StyledLink>
            <StyledTitle>{offer.venue.commonName}</StyledTitle>
            <Typo.Body>{offer.name}</Typo.Body>
          </div>
        ))}
        <StyledLastCard>
          <StyledCardWrapper>
            <StyledIcon>{firstIcon}</StyledIcon>
            <StyledIcon>{secondIcon}</StyledIcon>
            <StyledOffersHeader>
              <StyledOffersSurtitle>{firstCartTitle}</StyledOffersSurtitle>
              <StyledOffersSurtitle>{secondCartTitle}</StyledOffersSurtitle>
            </StyledOffersHeader>
            <StyledCardDescription>{descriptionCard}</StyledCardDescription>
            <CtaLink href={ctaCard.URL}>{ctaCard.Label}</CtaLink>
          </StyledCardWrapper>
        </StyledLastCard>
      </StyledOfferWrapper>
      <StyledBtnWrapper>
        <ButtonWithCTA cta={cta} />
      </StyledBtnWrapper>
      {/* {TODO: ADD CARD AND TEMOIGNAGES VIDEO} */}
    </Root>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    position: relative;

    p {
      margin-bottom: 1rem;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      h2,
      p {
        width: 100%;
        text-align: center;
      }
    }
  `}
`
const StyledOfferWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      grid-template-columns: 1fr;
      padding: 0 1.5rem;
    }
  `}
`

const StyledBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
`
const StyledLink = styled(Link)`
  display: block;
`
const StyledImage = styled(Image)`
  ${({ theme }) => css`
    background: linear-gradient(
      90deg,
      ${theme.colors.tertiary} -11.18%,
      ${theme.colors.secondary} 64.8%
    );

    border-radius: 0.5rem;
    object-fit: cover;
    width: 100%;
    height: auto;
  `}
`
const StyledCardDescription = styled(Typo.Body)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    text-align: center;
    width: 60%;
  `}
`
const StyledTitle = styled(Typo.Heading3)`
  ${({ theme }) => css`
    margin: 1.5rem 0 0.25rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      text-align: center;
    }
  `}
`
const StyledLastCard = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      170deg,
      ${theme.colors.tertiary} -11.18%,
      ${theme.colors.secondary} 64.8%
    );
    border-radius: 0.5rem;
    color: ${theme.colors.white}!important;

    height: 31.5rem;
    display: flex;
    align-items: center;
    position: relative;
  `}
`

const StyledOffersHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    align-self: center;

    margin-bottom: 2rem;
    margin-top: 1rem;
    width: fit-content;

    transform: rotate(-2.15deg);
    flex-shrink: 0;
    filter: drop-shadow(-4px 8px 24px rgba(0, 0, 0, 0.21));
    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 2.5rem;
    }
  `}
`
const StyledOffersSurtitle = styled(OutlinedText)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes['5xl']};
    font-weight: ${theme.fonts.weights.bold};
    color: ${theme.colors.secondary} !important;
    line-height: 1;
    width: fit-content;
    &:nth-child(2) {
      text-align: right;
      padding-left: 1rem;
    }
  `}
`
const CtaLink = styled(Link)`
  ${({ theme }) => css`
    display: inline-block;

    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    line-height: 1.4;

    color: ${theme.colors.white};

    padding: 1rem 1.75rem;
    border-radius: 100px;
    border: 1px solid ${theme.colors.white};

    @media (width < ${theme.mediaQueries.tablet}) {
      margin-right: 0;
      margin-bottom: 1.5rem;
      font-size: ${theme.fonts.sizes['2xs']};
    }
  `}
`

const StyledCardWrapper = styled.div`
  ${({ theme }) => css`
    height: fit-content;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding: 1.5rem;
    }
  `}
`

const StyledIcon = styled(OutlinedText)`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    font-size: ${theme.fonts.sizes['6xl']};
    margin: 0rem;
    &:nth-child(2) {
      top: auto;
      bottom: 0;
      left: 0;
    }
  `}
`
