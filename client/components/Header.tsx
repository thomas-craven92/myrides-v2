// defining interfaces etc

function Header() {

  // defining extra fns, useState etc
  return (
    <header 
      className="h-48 bg-cover bg-center" 
      style={{ backgroundImage: "url('/images/romania.jpg')" }}
    >
        <img
            className="h-full"
            src="/images/My Rides_Logo-CMYK-01.png"
            alt="My Rides logo"
        />
    </header>
  );
}
export default Header
