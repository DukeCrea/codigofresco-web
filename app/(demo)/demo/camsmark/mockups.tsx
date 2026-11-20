"use client";

import { useRef, useState } from "react";
import { products, type Product } from "./products";
import styles from "./page.module.css";

export function ProductImage({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.productImage}>
      {failed ? (
        <div className={styles.placeholder} role="img" aria-label={`Foto no disponible: ${product.name}`}>
          <span aria-hidden="true">↗</span><strong>{product.id}</strong><small>Foto no disponible</small>
        </div>
      ) : (
        // Se conserva la URL original del catálogo, sin proxy ni copias locales.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.image} alt={`${product.name}, ${product.spec}`} width={640} height={640}
          loading={priority ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

export function Avatar() {
  return <span className={styles.avatar} aria-hidden="true">c<span>m</span></span>;
}

export function Profile({ detail = "Publicación de ejemplo" }: { detail?: string }) {
  return <div className={styles.profile}><Avatar /><div><strong>Camsmark Latam</strong><small>{detail}</small></div><span className={styles.more} aria-hidden="true">•••</span></div>;
}

export function Creative({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <div className={styles.creative}>
      <div className={styles.creativeBrand}>CAMSMARK<span>LATAM / ELÉCTRICO E INDUSTRIAL</span></div>
      <ProductImage key={product.id} product={product} priority={priority} />
      <div className={styles.creativeBottom}><div><strong>{product.name}</strong><small>{product.spec}</small></div><b><small>USD</small>{product.price}</b></div>
      <div className={styles.creativeFooter}>EQUIPA TU PRÓXIMO PROYECTO<span>camsmark.com ↗</span></div>
    </div>
  );
}

export function InstagramFeed() {
  const [selected, setSelected] = useState(0);
  const [grid, setGrid] = useState(false);
  const product = products[selected];

  return (
    <div className={styles.phoneStage} id="instagram">
      <div className={styles.phoneNote}><span className={styles.liveDot} /> Así trabaja Freedom <span>↘</span></div>
      <div className={styles.phone}>
        <div className={styles.phoneStatus} aria-hidden="true"><b>9:41</b><span className={styles.island} /><span>▮▮▮ ▰</span></div>
        <div className={styles.instagramHeader}><span>Instagram</span><button type="button" onClick={() => setGrid(!grid)} aria-label={grid ? "Ver publicación seleccionada" : "Ver las 6 publicaciones"}>{grid ? "Ver publicación" : "Ver las 6"} <span aria-hidden="true">▦</span></button></div>
        <Profile detail="Panamá · Catálogo en USD" />
        {grid ? (
          <div className={styles.feedGrid}>
            {products.map((item, index) => <button key={item.id} type="button" onClick={() => { setSelected(index); setGrid(false); }} aria-label={`Ver publicación de ${item.name}`}><ProductImage product={item} /><strong>{item.name}</strong><span>USD {item.price}</span></button>)}
          </div>
        ) : (
          <div aria-live="polite" aria-atomic="true">
            <Creative product={product} priority />
            <div className={styles.socialActions} aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>
              <svg viewBox="0 0 24 24"><path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5a9 9 0 1 1 16.5-4.5Z" /></svg>
              <svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2" /></svg>
              <svg className={styles.bookmark} viewBox="0 0 24 24"><path d="M5 3h14v19l-7-5-7 5V3Z" /></svg>
            </div>
            <div className={styles.caption}><p><strong>Camsmark Latam</strong> {product.name} · <b>USD {product.price}</b></p><p>{product.benefit}</p><a href={product.url} target="_blank" rel="noopener noreferrer">Consulta los detalles en camsmark.com ↗</a><p className={styles.hashtags}>{product.hashtags}</p></div>
          </div>
        )}
        <div className={styles.phonePagination}>
          <button type="button" aria-label="Publicación anterior" onClick={() => { setSelected((selected + 5) % 6); setGrid(false); }}>←</button>
          <span aria-live="polite">{grid ? "6 publicaciones de ejemplo" : `Publicación ${selected + 1} de 6`}</span>
          <button type="button" aria-label="Publicación siguiente" onClick={() => { setSelected((selected + 1) % 6); setGrid(false); }}>→</button>
        </div>
        <div className={styles.homeIndicator} aria-hidden="true" />
      </div>
      <div className={styles.productPicker} aria-label="Seleccionar publicación">
        {products.map((item, index) => <button key={item.id} type="button" aria-label={`Publicación ${index + 1}: ${item.name}`} aria-pressed={selected === index} onClick={() => { setSelected(index); setGrid(false); }}><ProductImage product={item} /></button>)}
      </div>
      <p className={styles.phoneHint}>Toca un producto. Explora sus publicaciones.</p>
    </div>
  );
}

export function ProductCarousel() {
  const [slide, setSlide] = useState(0);
  const touchStart = useRef<number | null>(null);
  const product = products[slide];

  function move(direction: number) {
    setSlide((current) => (current + direction + products.length) % products.length);
  }

  return (
    <article className={styles.carouselCard} aria-label="Carrusel ilustrativo de seis productos de Camsmark" aria-roledescription="carrusel">
      <Profile detail="Carrusel de ejemplo · 6 productos" />
      <div className={styles.carouselSlide} aria-live="polite" aria-atomic="true"
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = touchStart.current - event.changedTouches[0].clientX;
          if (Math.abs(distance) > 45) move(distance > 0 ? 1 : -1);
          touchStart.current = null;
        }}>
        <span className={styles.slideCounter}>{slide + 1} / {products.length}</span>
        <Creative product={product} />
      </div>
      <div className={styles.carouselControls}>
        <button type="button" aria-label="Producto anterior del carrusel" onClick={() => move(-1)}>←</button>
        <div aria-label="Elegir lámina del carrusel">{products.map((item, index) => <button type="button" key={item.id} aria-label={`Lámina ${index + 1}: ${item.name}`} aria-pressed={index === slide} onClick={() => setSlide(index)}><span /></button>)}</div>
        <button type="button" aria-label="Producto siguiente del carrusel" onClick={() => move(1)}>→</button>
      </div>
      <div className={styles.carouselCaption}><p><strong>Camsmark Latam</strong> Una selección para tu próximo proyecto. Seis productos de nuestro catálogo, desde <b>USD 2.11</b>. Desliza, compara y encuentra el que necesitas.</p><a href={product.url} target="_blank" rel="noopener noreferrer">Ver {product.name} en la tienda ↗</a><p className={styles.hashtags}>#CamsmarkLatam #MaterialElectrico #Panama</p></div>
    </article>
  );
}
