type LobbyLayoutProps = {
    children: React.ReactNode
    // params: {
    //   locale: Locale
    // }
  }
  
  
  export default function LobbyLayout(props: LobbyLayoutProps) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl">Lobby</h1>
        </header>
        <main className="flex-1">
          {props.children}
        </main>
        <footer className="bg-gray-800 text-white p-4">
          <p>Footer</p>
        </footer>
      </div>
    )
  }