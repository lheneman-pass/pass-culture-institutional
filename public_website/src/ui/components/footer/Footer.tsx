import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import logoGouvernement from '../../../../public/images/logo-gouvernement.svg'
import logoPassCulture from '../../../../public/images/logo-pass-culture.svg'
import { FooterList } from './FooterList'
import { FooterMobileList } from './FooterMobileList'
import { useIsAndroid } from '@/hooks/useIsAndroid'

export type FooterProps = {
  PlayStoreUrl: string
  AppStoreUrl: string
  BannerText: string
  LegalLinks: { Label: string; URL: string; id: number }[]
  Lists: {
    id: number
    Title: string
    Links: { Label: string; URL: string }[]
  }[]
}

export function Footer({
  PlayStoreUrl,
  AppStoreUrl,
  BannerText,
  LegalLinks,
  Lists,
}: FooterProps) {
  const isAndroid = useIsAndroid()
  const storeUrl = isAndroid ? PlayStoreUrl : AppStoreUrl

  return (
    <StyledFooter>
      <StyledContentContainer>
        <StyledTopSection>
          <StyledLogos>
            {/* TODO: get real svg files and create SVGR files */}
            <Link href="https://pass.culture.fr/">
              <Image src={logoPassCulture} alt="Site du Pass Culture" />
            </Link>
            <Link href="https://www.gouvernement.fr">
              <Image
                src={logoGouvernement}
                alt="Site du Gouvernement Français"
              />
            </Link>
            <StyledDownloadBanner href={storeUrl} target="_blank">
              <p>{BannerText}</p>
            </StyledDownloadBanner>
          </StyledLogos>

          <StyledLists>
            {Lists.map((list) => (
              <React.Fragment key={list.id}>
                <FooterList title={list.Title} listItems={list.Links} />
                <FooterMobileList title={list.Title} listItems={list.Links} />
              </React.Fragment>
            ))}
          </StyledLists>
        </StyledTopSection>

        <StyledLegalLinks>
          {LegalLinks.map((link) => {
            return (
              <li key={link.id}>
                <Link href={link.URL}>{link.Label}</Link>
              </li>
            )
          })}
        </StyledLegalLinks>
      </StyledContentContainer>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  background-color: #faf8fe;
`

const StyledContentContainer = styled.div`
  ${({ theme }) => css`
    max-width: 1440px;
    margin: 0 auto;
    padding: 5rem 1rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding: 2rem 1rem;
    }
  `}
`

const StyledTopSection = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 25rem 1fr;
    align-items: start;
    gap: 6.25rem;
    margin-bottom: 5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  `}
`

const StyledLogos = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    align-items: center;
    justify-items: start;
    gap: 3.125rem 3.75rem;

    img {
      border: 1px solid;
      max-width: 100%;
    }

    a:nth-child(2) img {
      mix-blend-mode: multiply;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      gap: 2rem;
    }
  `}
`

const StyledDownloadBanner = styled(Link)`
  ${({ theme }) => css`
    grid-column: 1 / -1;
    justify-self: stretch;
    padding: 1.5rem 2rem;
    border-radius: 0.625rem;
    background: url('/images/banner-phone.svg'),
      linear-gradient(138.16deg, #610286 10%, #cc0261 100%);
    background-position: bottom right;
    background-size:
      auto 80%,
      cover;
    background-repeat: no-repeat;
    aspect-ratio: 3.1;
    display: flex;
    align-items: center;

    p {
      color: ${theme.colors.white};
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.bold};
      text-transform: uppercase;
      max-width: 50%;
    }
  `}
`

const StyledLists = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 4rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      gap: 0;
      grid-template-columns: 1fr;
    }
  `}
`

const StyledLegalLinks = styled.ul`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    color: ${theme.colors.black};
    opacity: 0.7;

    a:hover {
      text-decoration: underline;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      --legal-links-gap: 0.5rem;

      justify-content: initial;
      gap: var(--legal-links-gap);

      li {
        flex-basis: calc(50% - (var(--legal-links-gap) / 2));
      }
    }
  `}
`
