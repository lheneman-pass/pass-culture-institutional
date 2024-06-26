import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Filter, FilterContainer } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'

interface ListProps {
  resourceREData: APIResponseData<'api::resource.resource'>[]
  ressourcesEnseignantsListe: APIResponseData<'api::ressources-enseignant.ressources-enseignant'>
}

export default function RessourcesEnseignants({
  resourceREData,
  ressourcesEnseignantsListe,
}: ListProps) {
  const cat = Array.from(
    new Set(resourceREData.map((item) => item.attributes.category))
  )

  const loc = Array.from(
    new Set(resourceREData.map((item) => item.attributes.localisation))
  )

  const sec = Array.from(
    new Set(resourceREData.map((item) => item.attributes.secteur))
  )
  const [category, setCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [originalCategory, setOriginalCategory] = useState<string[]>([])
  const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])
  const [secteur, setSecteur] = useState<string[]>([])
  const [originalSecteur, setOriginalSecteur] = useState<string[]>([])

  const [filters, setFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::resource.resource'>[]>(
    []
  )

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setOriginalLocalisation(loc)
    setOriginalCategory(cat)
    setSecteur(sec)
    setOriginalSecteur(sec)

    setData(resourceREData)
    let uniqueCategories = []
    let uniqueLocalisations = []
    let uniqueSecteurs = []

    const filtres = ressourcesEnseignantsListe.attributes?.filtres?.map(
      (filtre) => {
        switch (filtre.filtre) {
          case 'Catégorie':
            uniqueCategories = Array.from(
              new Set(resourceREData.map((item) => item.attributes.category))
            )
            return {
              ...filtre,
              value: uniqueCategories,
            }
          case 'Localisation':
            uniqueLocalisations = Array.from(
              new Set(
                resourceREData.map((item) => item.attributes.localisation)
              )
            )
            return {
              ...filtre,
              value: uniqueLocalisations,
            }
          case "Secteur d'activités":
            uniqueSecteurs = Array.from(
              new Set(resourceREData.map((item) => item.attributes.secteur))
            )
            return {
              ...filtre,
              value: uniqueSecteurs,
            }
          default:
            return { ...filtre, value: [] }
        }
      }
    )
    if (filtres) setFilters(filtres)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchDataRessourcesEnseignants = async () => {
    const newsQuery = stringify({
      populate: ['image'],
      sort: ['date:desc'],
      pagination: {},
      filters: {
        category: {
          $eqi: category,
        },
        secteur: {
          $eqi: secteur,
        },
        localisation: {
          $eqi: localisation,
        },
        pageLocalisation: {
          $containsi: 'S’informer - ressources',
        },
      },
    })

    const news = await fetchCMS<APIResponseData<'api::resource.resource'>[]>(
      `/resources?${newsQuery}`
    )

    setData(news.data)
  }

  const handleFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Localisation':
        setLocalisation(value[0] === '' ? originalLocalisation : value)
        break
      case "Secteur d'activités":
        setSecteur(value[0] === '' ? originalSecteur : value)
        break
      case 'Catégorie':
        setCategory(value[0] === '' ? originalCategory : value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    fetchDataRessourcesEnseignants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur])

  return (
    <React.Fragment>
      {ressourcesEnseignantsListe.attributes.seo && (
        <Seo metaData={ressourcesEnseignantsListe.attributes.seo} />
      )}
      <StyledTitle>
        {ressourcesEnseignantsListe.attributes.title && (
          <Typo.Heading2>
            {ressourcesEnseignantsListe.attributes.title}
          </Typo.Heading2>
        )}
        <UnpaddedBreadcrumb />
        <FilterContainer
          filtres={filters}
          onFilterChange={handleFilterChange}
        />
      </StyledTitle>
      <StyledListItems
        news={data}
        type="ressources"
        buttonText={ressourcesEnseignantsListe.attributes.buttonText}
      />

      <Separator
        isActive={ressourcesEnseignantsListe.attributes.separator?.isActive}
      />

      <SimplePushCta
        title={ressourcesEnseignantsListe.attributes.aide?.title}
        image={ressourcesEnseignantsListe.attributes.aide?.image}
        cta={ressourcesEnseignantsListe.attributes.aide?.cta}
        surtitle={ressourcesEnseignantsListe.attributes.aide?.surtitle}
        icon={ressourcesEnseignantsListe.attributes.aide?.icon}
      />

      {ressourcesEnseignantsListe.attributes.socialMediaSection &&
        ressourcesEnseignantsListe.attributes.socialMediaSection.title &&
        ressourcesEnseignantsListe.attributes.socialMediaSection
          .socialMediaLink && (
          <StyledSocialMedia
            title={
              ressourcesEnseignantsListe.attributes.socialMediaSection.title
            }
            socialMediaLink={
              ressourcesEnseignantsListe.attributes.socialMediaSection
                .socialMediaLink
            }
          />
        )}
    </React.Fragment>
  )
}

export const getStaticProps = (async () => {
  const newsQuery = stringify({
    populate: ['image'],
    pagination: {},
    sort: ['date:desc'],
    filters: {
      category: {
        $eqi: [
          'Communiqué de presse',
          'Dossier de presse',
          'Étude ponctuelle',
          'Étude ritualisée',
        ],
      },
      pageLocalisation: {
        $containsi: 'S’informer - ressources',
      },
    },
  })

  const news = await fetchCMS<APIResponseData<'api::resource.resource'>[]>(
    `/resources?${newsQuery}`
  )

  const rsQuery = stringify({
    populate: [
      'title',
      'buttonText',
      'filtres',
      'socialMediaSection',
      'socialMediaSection.socialMediaLink',
      'separator',
      'aide',
      'aide.image',
      'aide.cta',
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })
  const { data } = await fetchCMS<
    APIResponseData<'api::ressources-enseignant.ressources-enseignant'>
  >(`/ressources-enseignant?${rsQuery}`)

  return {
    props: {
      resourceREData: news.data,
      ressourcesEnseignantsListe: data,
    },
  }
}) satisfies GetStaticProps<ListProps>

const StyledTitle = styled.div`
  ${({ theme }) => css`
    margin-inline: auto;
    padding: 1rem 1.5rem;
    max-width: 80rem;
    margin-top: 4rem;
    h2 {
      margin-bottom: 4rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      h2 {
        text-align: center;
        font-size: ${theme.fonts.sizes['5xl']};
      }
    }
  `}
`

const StyledListItems = styled(ListItems)`
  margin-top: 3rem;
`
const StyledSocialMedia = styled(SocialMedia)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 5rem 0 6.25rem;
    }
  `}
`
const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
