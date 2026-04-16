<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-contenu">
        <div>
          <RouterLink to="/" class="footer-logo-texte">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10h20l-2 16H8L6 10z" stroke="white" stroke-width="2" stroke-linejoin="round" fill="#fbd0d3" />
              <path d="M11 10V8a5 5 0 0 1 10 0v2" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
            <span>Boutique</span>
          </RouterLink>
        </div>

        <p class="footer-signature">Fait par Hannela Raudik</p>

        <div class="footer-reseaux">
          <a href="#" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <a href="#" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          <a href="#" aria-label="Twitter / X">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--neutral-soft);
  color: var(--white);
  padding: var(--space-8) var(--space-12);
  margin-top: auto;
}

.footer-contenu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.footer-logo-texte {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--neutral-tint);
  opacity: 0.75;
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.footer-logo-texte:hover {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--primary-color);
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.footer-logo-texte svg {
  flex-shrink: 0;
}

.footer-signature {
  font-size: var(--font-size-sm);
  opacity: 0.75;
  margin: 0;
}

.footer-reseaux {
  display: flex;
  gap: var(--space-4);
}

.footer-reseaux a {
  color: var(--white);
  opacity: 0.8;
  transition: opacity 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.footer-reseaux a svg {
  color: var(--white);
  stroke: var(--white);
}
.footer-reseaux a:hover {
  background-color: var(--primary-color);
}

.footer-reseaux a:last-child svg {
  fill: var(--white);
  stroke: none;
}

@media (max-width: 768px) {
  .footer-contenu {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-4);
  }
 
  .footer {
   padding: var(--space-4) var(--space-6);
  }

   .footer-logo-texte {
  font-size: var(--font-size-lg);
  }
  .footer-signature {
    font-size: var(--font-size-sm);
  }
}
</style>
