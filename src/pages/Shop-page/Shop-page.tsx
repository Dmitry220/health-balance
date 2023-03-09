import { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { ShopCards } from '../../Components/Shop/Shop-card'
import './shop-page.scss'
import { TabContent, Tabs } from '../../Components/Tabs/Tabs'
import { ShopHead } from '../../Components/Shop/Shop-head'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getShopCategories, shopCategoriesSelector } from '../../Redux/slice/shopSlice'

export const ShopPage = () => {
  const [valueTab, setValueTab] = useState<number>(0)

  const dispatch = useAppDispatch()
  const category = useAppSelector(shopCategoriesSelector)

  useEffect(() => {
    dispatch(getShopCategories())
  }, [])

  return (
    <div className={'shop-page'}>
      <Header title={'Награда'} />
      <ShopHead marginBottom={42} />
      <Tabs
        labels={category.map(item => item.name)}
        onClick={setValueTab}
        value={valueTab}
        customClassChildren={'shop-page__tabs-labels'}
        customClassParent={'shop-page__tabs'}
      />
      {
        category.map((item, i) => (
          <TabContent index={i} value={valueTab} key={item.id}>
            <ShopCards idCategory={item.id} />
          </TabContent>
        ))
      }
    </div>
  )
}
