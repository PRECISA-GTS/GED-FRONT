import authConfig from 'src/configs/auth'

// Função para verificar a expiração do token e atualizar se necessário
export const checkAndRefreshToken = () => {
  const tokenExpirationTime = 240 //? minutes
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);

  if (storedToken) {
    // Decodifica o payload do token JWT
    const tokenParts = storedToken.split('.');
    if (tokenParts.length !== 3) {
      console.error('Invalid JWT format');
      handleLogout(); // Chama o logout se o token não for válido
      return;
    }

    // Decodifica a parte do payload (o segundo segmento do JWT)
    const payload = JSON.parse(atob(tokenParts[1]));
    const { exp } = payload;

    if (Date.now() >= exp * 1000) {
      console.log('Expired token!');
      handleLogout(); // Chama a função de logout se o token estiver expirado
    } else {
      // Atualiza o token para expirar em 30 minutos a partir de agora
      const newExp = Math.floor(Date.now() / 1000) + (tokenExpirationTime * 60);
      const newToken = {
        ...payload,
        exp: newExp
      };
      const newTokenString = `${tokenParts[0]}.${btoa(JSON.stringify(newToken))}.${tokenParts[2]}`; // Mantém a parte do header e signature
      window.localStorage.setItem(authConfig.storageTokenKeyName, newTokenString); // Atualiza o token no localStorage
    }
  }
}

export const getTokenExpiration = () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
  if (storedToken) {
    const tokenParts = storedToken.split('.');
    if (tokenParts.length !== 3) {
      console.error('Invalid JWT format!');
      return;
    }
    // Decodifica a parte do payload (o segundo segmento do JWT)
    const payload = JSON.parse(atob(tokenParts[1]));
    const { exp } = payload;

    // Retornar no formato de data dd/mm/yyyy hh:mm:ss
    const date = new Date(exp * 1000);
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    return formattedDate

  }
}

// Função para fazer logout
const handleLogout = () => {
  window.localStorage.removeItem('userData');
  window.localStorage.removeItem('userUnits');
  window.localStorage.removeItem('loggedUnity');
  window.localStorage.removeItem('routes');
  window.localStorage.removeItem('menu');
  window.localStorage.removeItem('unreadNotifications');
  window.localStorage.removeItem(authConfig.storageTokenKeyName);
  window.location.reload();
}
