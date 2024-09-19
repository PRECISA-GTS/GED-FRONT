const getTabFromURL = (defaultTab, router) => {
  return router?.query.aba || defaultTab
}

const tabChange = (value, router) => {
  router.push(
    {
      pathname: router.pathname,
      query: { ...router?.query, aba: value }
    },
    undefined,
    { shallow: true }
  )
}

export { getTabFromURL, tabChange }
