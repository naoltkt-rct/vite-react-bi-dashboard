export const initMocks = async () => {
  // browser
  if (typeof window !== 'undefined') {
    const { worker } = await import('@/mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
  // node
  // else {
  //   const { server } = await import('@/mocks/node')
  //   server.listen()
  // }
}
