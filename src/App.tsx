import { useState, useEffect, useMemo, useCallback, CSSProperties } from 'react'
import './App.css'

// ============================================================
// TYPES & DATA
// ============================================================

interface Skin {
  id: string
  name: string
  description: string
  background: string
  backgroundImage: string
  fontFamily: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  textColor: string
  borderStyle: string
  borderColor: string
  cardBg: string
  cardBorder: string
  headerGradient: string
  glowColor: string
  specialEffect: string
  buttonStyle: string
}

interface Post {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  mood: string
}

interface Track {
  id: string
  title: string
  artist: string
}

const SKINS: Skin[] = [
  {
    id: 'blue-heart-love',
    name: 'Blue Heart Love',
    description: 'Hearts, blue tones, romantic vibes',
    background: 'linear-gradient(180deg, #0a0a2e 0%, #1a1a4e 50%, #0d0d3d 100%)',
    backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(100, 149, 237, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)',
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
    primaryColor: '#6495ED',
    secondaryColor: '#87CEEB',
    accentColor: '#FF69B4',
    textColor: '#E0E8FF',
    borderStyle: '3px dashed',
    borderColor: '#6495ED',
    cardBg: 'rgba(10, 10, 46, 0.85)',
    cardBorder: '2px solid #6495ED',
    headerGradient: 'linear-gradient(90deg, #1a1a6e, #2a2a8e, #1a1a6e)',
    glowColor: '#6495ED',
    specialEffect: 'hearts',
    buttonStyle: 'bg-blue-600 hover:bg-blue-500 text-white border-2 border-blue-400',
  },
  {
    id: 'ghetto-graffiti',
    name: 'Ghetto Graffiti',
    description: 'Urban, graffiti art, bold colors',
    background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,0,0,0.03) 35px, rgba(255,0,0,0.03) 70px)',
    fontFamily: '"Impact", "Arial Black", sans-serif',
    primaryColor: '#FF4500',
    secondaryColor: '#FFD700',
    accentColor: '#00FF00',
    textColor: '#FFFFFF',
    borderStyle: '4px solid',
    borderColor: '#FF4500',
    cardBg: 'rgba(30, 30, 30, 0.9)',
    cardBorder: '3px solid #FF4500',
    headerGradient: 'linear-gradient(90deg, #FF4500, #FF6347, #FF4500)',
    glowColor: '#FF4500',
    specialEffect: 'spray',
    buttonStyle: 'bg-red-600 hover:bg-red-500 text-white border-2 border-yellow-400',
  },
  {
    id: 'pink-bling',
    name: 'Pink Bling',
    description: 'Hot pink, diamonds, sparkles',
    background: 'linear-gradient(180deg, #2d0a1e 0%, #4a1232 50%, #2d0a1e 100%)',
    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 20, 147, 0.1) 0%, transparent 70%)',
    fontFamily: '"Trebuchet MS", "Lucida Sans", sans-serif',
    primaryColor: '#FF1493',
    secondaryColor: '#FF69B4',
    accentColor: '#FFD700',
    textColor: '#FFE4E1',
    borderStyle: '3px double',
    borderColor: '#FF1493',
    cardBg: 'rgba(45, 10, 30, 0.85)',
    cardBorder: '2px solid #FF1493',
    headerGradient: 'linear-gradient(90deg, #FF1493, #FF69B4, #FF1493)',
    glowColor: '#FF1493',
    specialEffect: 'sparkle',
    buttonStyle: 'bg-pink-600 hover:bg-pink-500 text-white border-2 border-pink-300',
  },
  {
    id: 'galaxy-space',
    name: 'Galaxy Space',
    description: 'Stars, nebula, dark with neon',
    background: 'linear-gradient(180deg, #0a0015 0%, #1a0030 30%, #0d001a 60%, #050010 100%)',
    backgroundImage: 'radial-gradient(ellipse at 30% 20%, rgba(138, 43, 226, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(0, 191, 255, 0.15) 0%, transparent 50%)',
    fontFamily: '"Segoe UI", "Century Gothic", sans-serif',
    primaryColor: '#8A2BE2',
    secondaryColor: '#00BFFF',
    accentColor: '#FF00FF',
    textColor: '#E8D5FF',
    borderStyle: '2px solid',
    borderColor: '#8A2BE2',
    cardBg: 'rgba(10, 0, 21, 0.85)',
    cardBorder: '2px solid #8A2BE2',
    headerGradient: 'linear-gradient(90deg, #8A2BE2, #9B30FF, #00BFFF, #8A2BE2)',
    glowColor: '#8A2BE2',
    specialEffect: 'stars',
    buttonStyle: 'bg-purple-700 hover:bg-purple-600 text-white border-2 border-purple-400',
  },
  {
    id: 'scene-emo',
    name: 'Scene / Emo',
    description: 'Black, neon, checkerboard',
    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
    backgroundImage: 'repeating-conic-gradient(#111 0% 25%, #0a0a0a 0% 50%) 0 0 / 40px 40px',
    fontFamily: '"Courier New", monospace',
    primaryColor: '#00FF00',
    secondaryColor: '#FF00FF',
    accentColor: '#00FFFF',
    textColor: '#CCCCCC',
    borderStyle: '2px dashed',
    borderColor: '#00FF00',
    cardBg: 'rgba(15, 15, 15, 0.9)',
    cardBorder: '2px dashed #00FF00',
    headerGradient: 'linear-gradient(90deg, #111, #222, #111)',
    glowColor: '#00FF00',
    specialEffect: 'glitch',
    buttonStyle: 'bg-black hover:bg-gray-900 text-green-400 border-2 border-green-400',
  },
  {
    id: 'tropical-paradise',
    name: 'Tropical Paradise',
    description: 'Palm trees, bright colors, island vibes',
    background: 'linear-gradient(180deg, #004d40 0%, #00695c 30%, #00897b 60%, #004d40 100%)',
    backgroundImage: 'radial-gradient(circle at 80% 90%, rgba(255, 193, 7, 0.15) 0%, transparent 50%)',
    fontFamily: '"Papyrus", "Comic Sans MS", fantasy',
    primaryColor: '#00BCD4',
    secondaryColor: '#FF9800',
    accentColor: '#FFEB3B',
    textColor: '#E0F7FA',
    borderStyle: '3px solid',
    borderColor: '#00BCD4',
    cardBg: 'rgba(0, 77, 64, 0.85)',
    cardBorder: '3px solid #FF9800',
    headerGradient: 'linear-gradient(90deg, #FF9800, #FF5722, #FF9800)',
    glowColor: '#00BCD4',
    specialEffect: 'palm',
    buttonStyle: 'bg-teal-600 hover:bg-teal-500 text-white border-2 border-orange-400',
  },
  {
    id: 'gold-chain',
    name: 'Gold Chain',
    description: 'Gold, black, luxury hip-hop aesthetic',
    background: 'linear-gradient(180deg, #0d0d0d 0%, #1a1a0a 50%, #0d0d0d 100%)',
    backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255, 215, 0, 0.08) 0%, transparent 60%)',
    fontFamily: '"Impact", "Arial Black", sans-serif',
    primaryColor: '#FFD700',
    secondaryColor: '#DAA520',
    accentColor: '#FF6347',
    textColor: '#FFF8DC',
    borderStyle: '3px ridge',
    borderColor: '#FFD700',
    cardBg: 'rgba(13, 13, 13, 0.9)',
    cardBorder: '3px ridge #FFD700',
    headerGradient: 'linear-gradient(90deg, #B8860B, #FFD700, #DAA520, #FFD700, #B8860B)',
    glowColor: '#FFD700',
    specialEffect: 'bling',
    buttonStyle: 'bg-yellow-700 hover:bg-yellow-600 text-black border-2 border-yellow-400',
  },
  {
    id: 'anime-kawaii',
    name: 'Anime Kawaii',
    description: 'Pastel, cute Japanese anime style',
    background: 'linear-gradient(180deg, #1a0a2e 0%, #2a1a3e 50%, #1a0a2e 100%)',
    backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(173, 216, 230, 0.1) 0%, transparent 50%)',
    fontFamily: '"Segoe UI", "Trebuchet MS", sans-serif',
    primaryColor: '#FFB6C1',
    secondaryColor: '#ADD8E6',
    accentColor: '#DDA0DD',
    textColor: '#FFF0F5',
    borderStyle: '3px dotted',
    borderColor: '#FFB6C1',
    cardBg: 'rgba(26, 10, 46, 0.85)',
    cardBorder: '2px dotted #FFB6C1',
    headerGradient: 'linear-gradient(90deg, #FFB6C1, #DDA0DD, #ADD8E6, #DDA0DD, #FFB6C1)',
    glowColor: '#FFB6C1',
    specialEffect: 'kawaii',
    buttonStyle: 'bg-pink-400 hover:bg-pink-300 text-purple-900 border-2 border-pink-200',
  },
]

const TRACKS: Track[] = [
  { id: 'JSwjJxyNl7Q', title: 'Soulja Boy - Crank That', artist: 'Soulja Boy Tell\'em' },
  { id: 'Bg59q4puhmg', title: 'Avril Lavigne - Girlfriend', artist: 'Avril Lavigne' },
  { id: 'CvBfHwUxHIk', title: 'Rihanna - Umbrella ft. Jay-Z', artist: 'Rihanna' },
  { id: 'dq6Q_uaJFGo', title: 'T-Pain - Buy U a Drank', artist: 'T-Pain' },
  { id: 'MrTz5xjmso4', title: 'Sean Kingston - Beautiful Girls', artist: 'Sean Kingston' },
  { id: 'q0SyUgw98tE', title: 'Fergie - Glamorous ft. Ludacris', artist: 'Fergie' },
  { id: 'TwyE3WJ4AWo', title: 'Mims - This Is Why I\'m Hot', artist: 'Mims' },
  { id: 'oc65hFCls8E', title: 'Shop Boyz - Party Like a Rockstar', artist: 'Shop Boyz' },
  { id: 'EIhSnaqou0I', title: 'Plain White T\'s - Hey There Delilah', artist: 'Plain White T\'s' },
  { id: 'PsO6ZnUZI0g', title: 'Kanye West - Stronger', artist: 'Kanye West' },
  { id: 'GGXzlRoNtHU', title: 'Akon - Don\'t Matter', artist: 'Akon' },
  { id: 'dZX6Q-Bj_xg', title: 'Gym Class Heroes - Cupid\'s Chokehold', artist: 'Gym Class Heroes' },
]

const MOODS = [
  { emoji: '😎', label: 'chillin' },
  { emoji: '🥰', label: 'loved' },
  { emoji: '😤', label: 'grumpy' },
  { emoji: '🤪', label: 'crazy' },
  { emoji: '😢', label: 'emo' },
  { emoji: '🥳', label: 'partyin' },
  { emoji: '😴', label: 'sleepy' },
  { emoji: '🤑', label: 'ballin' },
  { emoji: '😇', label: 'blessed' },
  { emoji: '🔥', label: 'on fire' },
  { emoji: '💀', label: 'dead' },
  { emoji: '✨', label: 'magical' },
]

const DEFAULT_POSTS: Post[] = [
  {
    id: '1',
    author: 'xX_DarkAngel_Xx',
    avatar: '🖤',
    content: 'OMG just changed my layout for the 5th time today!! This one is SO cute tho fr fr 💖✨',
    timestamp: 'Jan 15, 2007 3:42 PM',
    mood: 'crazy',
  },
  {
    id: '2',
    author: '~*PrInCeSs*~',
    avatar: '👑',
    content: 'PC4PC?? Add me on AIM: sparkleprincess2007 lol 😝',
    timestamp: 'Jan 15, 2007 2:18 PM',
    mood: 'chillin',
  },
  {
    id: '3',
    author: 'LiL_ShAwTy_07',
    avatar: '💎',
    content: 'This song is my JAM!! Crank that Soulja Boy!! 🎵🔥 YOUUUUU',
    timestamp: 'Jan 14, 2007 11:55 PM',
    mood: 'partyin',
  },
  {
    id: '4',
    author: 'sk8rboi_2007',
    avatar: '🛹',
    content: 'just got back from hot topic, copped the sickest band tee 🤘 if u dont like it ur not scene enough',
    timestamp: 'Jan 14, 2007 8:30 PM',
    mood: 'on fire',
  },
  {
    id: '5',
    author: '*.+BaByGiRl+.*',
    avatar: '🦋',
    content: 'tYpInG lIkE tHiS bEcAuSe ItS 2007 aNd We CaN 🤪💕',
    timestamp: 'Jan 14, 2007 6:12 PM',
    mood: 'magical',
  },
  {
    id: '6',
    author: 'PIMP_DADDY',
    avatar: '🎩',
    content: 'yo who got the new T-Pain album?? Buy U a Drank is FIRE 🔥🔥🔥',
    timestamp: 'Jan 14, 2007 4:45 PM',
    mood: 'ballin',
  },
  {
    id: '7',
    author: 'XxEmoKidxX',
    avatar: '💔',
    content: 'nobody understands me... listening to MCR on repeat... *sigh* 🖤',
    timestamp: 'Jan 13, 2007 11:11 PM',
    mood: 'emo',
  },
]

const TOP_8_FRIENDS = [
  { name: 'Tom', avatar: '👤', status: 'MySpace CEO lol' },
  { name: 'xX_DarkAngel_Xx', avatar: '🖤', status: 'rawr xD' },
  { name: '~*PrInCeSs*~', avatar: '👑', status: 'PC4PC??' },
  { name: 'sk8rboi_2007', avatar: '🛹', status: 'scene 4 life' },
  { name: 'LiL_ShAwTy_07', avatar: '💎', status: 'ballin' },
  { name: '*.+BaByGiRl+.*', avatar: '🦋', status: 'add me <3' },
  { name: 'XxEmoKidxX', avatar: '💔', status: 'broken...' },
  { name: 'PIMP_DADDY', avatar: '🎩', status: 'gettin money' },
]

const PARTICLE_CONFIGS: Record<string, { particles: string[]; count: number }> = {
  hearts: { particles: ['💖', '💕', '💗', '💝', '💙', '💜', '🩵'], count: 15 },
  sparkle: { particles: ['✨', '💎', '💍', '👑', '💖', '⭐', '🌟'], count: 18 },
  stars: { particles: ['⭐', '🌟', '✨', '💫', '🪐', '🌙', '☄️'], count: 20 },
  spray: { particles: ['🔥', '💯', '🎨', '💢', '⚡', '🌀'], count: 10 },
  glitch: { particles: ['⚡', '💀', '🖤', '💚', '▪️', '🔳'], count: 8 },
  bling: { particles: ['💰', '💎', '👑', '🏆', '💵', '🔗', '⛓️'], count: 14 },
  palm: { particles: ['🌴', '🌺', '🌊', '☀️', '🐚', '🦩', '🍹'], count: 12 },
  kawaii: { particles: ['🌸', '🎀', '💮', '🩷', '⭐', '🫧', '🦋'], count: 16 },
}

// ============================================================
// HELPER COMPONENTS
// ============================================================

function FloatingParticles({ skin }: { skin: Skin }) {
  const config = PARTICLE_CONFIGS[skin.specialEffect] || PARTICLE_CONFIGS.hearts

  const particles = useMemo(() => {
    return Array.from({ length: config.count }, (_, i) => ({
      id: i,
      emoji: config.particles[i % config.particles.length],
      left: `${(i * 37 + 13) % 100}%`,
      animationDelay: `${(i * 1.3) % 8}s`,
      animationDuration: `${6 + (i * 0.7) % 8}s`,
      fontSize: `${0.8 + (i * 0.15) % 1.2}rem`,
      opacity: 0.4 + (i * 0.05) % 0.4,
    }))
  }, [config.count, config.particles])

  return (
    <div className="floating-particles">
      {particles.map((p) => (
        <span
          key={p.id}
          className={skin.specialEffect === 'stars' ? 'floating-star' : 'floating-particle'}
          style={{
            left: p.left,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
            fontSize: p.fontSize,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function SkinSelector({ currentSkin, onSkinChange }: { currentSkin: Skin; onSkinChange: (s: Skin) => void }) {
  return (
    <div
      className="skin-transition p-3 rounded"
      style={{
        background: currentSkin.cardBg,
        border: currentSkin.cardBorder,
        '--glow-color': currentSkin.glowColor,
      } as CSSProperties}
    >
      <h3
        className="text-center font-bold text-sm mb-3 uppercase tracking-widest blink-text"
        style={{ color: currentSkin.primaryColor }}
      >
        {'<< '}ChAnGe Ur SkIn{' >>'}
      </h3>
      <div className="retro-divider" style={{ '--glow-color': currentSkin.glowColor } as CSSProperties} />
      <div className="grid grid-cols-2 gap-2 mt-2">
        {SKINS.map((skin) => (
          <button
            key={skin.id}
            onClick={() => onSkinChange(skin)}
            className={`retro-button text-xs p-2 transition-all ${
              currentSkin.id === skin.id ? 'ring-2 scale-105' : 'opacity-80 hover:opacity-100'
            }`}
            style={{
              background: skin.headerGradient,
              color: skin.textColor,
              borderColor: skin.primaryColor,
              fontFamily: skin.fontFamily,
              outlineColor: skin.accentColor,
            }}
            title={skin.description}
          >
            <span className="block truncate">{skin.name}</span>
            {currentSkin.id === skin.id && (
              <span className="text-xs block mt-1">{'>> '}ACTIVE{' <<'}</span>
            )}
          </button>
        ))}
      </div>
      <div className="retro-divider mt-3" style={{ '--glow-color': currentSkin.glowColor } as CSSProperties} />
      <p className="text-center text-xs mt-2 opacity-60" style={{ color: currentSkin.textColor }}>
        pimp ur profile lol
      </p>
    </div>
  )
}

function MusicPlayer({ skin, onTrackChange }: { skin: Skin; onTrackChange: (track: Track) => void }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)

  const currentTrack = TRACKS[currentTrackIndex]

  const handlePrev = useCallback(() => {
    setCurrentTrackIndex((prev) => {
      const newIdx = (prev - 1 + TRACKS.length) % TRACKS.length
      onTrackChange(TRACKS[newIdx])
      return newIdx
    })
  }, [onTrackChange])

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => {
      const newIdx = (prev + 1) % TRACKS.length
      onTrackChange(TRACKS[newIdx])
      return newIdx
    })
  }, [onTrackChange])

  const handleTrackSelect = useCallback((index: number) => {
    setCurrentTrackIndex(index)
    setIsPlaying(true)
    setShowPlaylist(false)
    onTrackChange(TRACKS[index])
  }, [onTrackChange])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  return (
    <div
      className="skin-transition rounded overflow-hidden"
      style={{
        background: skin.cardBg,
        border: skin.cardBorder,
        '--glow-color': skin.glowColor,
      } as CSSProperties}
    >
      <div className="p-2 text-center" style={{ background: skin.headerGradient }}>
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: skin.textColor }}>
          Now Playing
        </span>
      </div>

      {/* Equalizer */}
      <div className="flex items-end justify-center gap-0.5 py-2 px-3 h-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="eq-bar"
            style={{
              backgroundColor: skin.primaryColor,
              opacity: isPlaying ? 1 : 0.3,
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
          />
        ))}
      </div>

      {/* Track Info */}
      <div className="px-3 py-1 text-center">
        <div className="overflow-hidden">
          <p
            className={`text-sm font-bold ${isPlaying ? 'marquee-text' : ''}`}
            style={{ color: skin.primaryColor }}
          >
            {currentTrack.title}
          </p>
        </div>
        <p className="text-xs opacity-70 mt-0.5" style={{ color: skin.textColor }}>
          {currentTrack.artist}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 py-2 px-3">
        <button
          onClick={handlePrev}
          className="retro-button text-sm px-2 py-1"
          style={{ background: skin.cardBg, color: skin.primaryColor, borderColor: skin.primaryColor }}
        >
          {'|<<'}
        </button>
        <button
          onClick={togglePlay}
          className="retro-button text-sm px-3 py-1 glow-border"
          style={{
            background: skin.headerGradient,
            color: skin.textColor,
            borderColor: skin.primaryColor,
            '--glow-color': skin.glowColor,
          } as CSSProperties}
        >
          {isPlaying ? '| |' : '>>'}
        </button>
        <button
          onClick={handleNext}
          className="retro-button text-sm px-2 py-1"
          style={{ background: skin.cardBg, color: skin.primaryColor, borderColor: skin.primaryColor }}
        >
          {'>>|'}
        </button>
      </div>

      {/* YouTube Embed (audio only via hidden iframe) */}
      {isPlaying && (
        <div className="px-3 pb-2">
          <iframe
            width="100%"
            height="0"
            src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=1&loop=0`}
            allow="autoplay; encrypted-media"
            style={{ border: 'none', height: 0, overflow: 'hidden' }}
            title={currentTrack.title}
          />
        </div>
      )}

      {/* Playlist Toggle */}
      <div className="px-3 pb-2">
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="w-full text-xs py-1 retro-button"
          style={{ background: skin.cardBg, color: skin.accentColor, borderColor: skin.borderColor }}
        >
          {showPlaylist ? '[-] Hide Playlist' : '[+] Show Playlist'}
        </button>
      </div>

      {/* Playlist */}
      {showPlaylist && (
        <div
          className="px-3 pb-3 max-h-48 overflow-y-auto retro-scrollbar"
          style={{ borderTop: `1px solid ${skin.borderColor}` }}
        >
          {TRACKS.map((track, index) => (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(index)}
              className={`w-full text-left text-xs py-1.5 px-2 block transition-colors ${
                index === currentTrackIndex ? 'font-bold' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                color: index === currentTrackIndex ? skin.primaryColor : skin.textColor,
                background: index === currentTrackIndex ? `${skin.primaryColor}15` : 'transparent',
              }}
            >
              <span className="mr-2">{index === currentTrackIndex ? '>> ' : `${index + 1}. `}</span>
              {track.title}
            </button>
          ))}
        </div>
      )}

      <div
        className="py-1 text-center text-xs"
        style={{ background: skin.headerGradient, color: skin.textColor }}
      >
        Track {currentTrackIndex + 1} / {TRACKS.length}
      </div>
    </div>
  )
}

function ProfileCard({ skin, selectedMood, onMoodChange, username, onUsernameChange }: {
  skin: Skin
  selectedMood: string
  onMoodChange: (mood: string) => void
  username: string
  onUsernameChange: (name: string) => void
}) {
  const currentMood = MOODS.find((m) => m.label === selectedMood) || MOODS[0]

  return (
    <div className="space-y-4">
      {/* Main Profile Card */}
      <div
        className="skin-transition rounded overflow-hidden glow-border"
        style={{
          background: skin.cardBg,
          border: skin.cardBorder,
          '--glow-color': skin.glowColor,
        } as CSSProperties}
      >
        <div className="p-3 text-center" style={{ background: skin.headerGradient }}>
          <div className="text-4xl mb-1 bounce-element">{currentMood.emoji}</div>
          <input
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            className="retro-input text-center w-full text-lg font-bold bg-transparent border-none"
            style={{
              color: skin.textColor,
              fontFamily: skin.fontFamily,
              textShadow: `0 0 10px ${skin.glowColor}`,
              borderBottom: `1px dashed ${skin.primaryColor}`,
              background: 'transparent',
            }}
            placeholder="Enter ur name..."
          />
        </div>

        <div className="p-3">
          <table className="profile-table w-full text-xs" style={{ color: skin.textColor }}>
            <tbody>
              {[
                ['Status:', 'Online !! :D'],
                ['Mood:', `${currentMood.emoji} ${currentMood.label}`],
                ['Layout:', skin.name],
                ['Last Login:', 'Jan 15, 2007'],
                ['Member Since:', '2006 lol'],
              ].map(([label, value], i) => (
                <tr key={label} style={{ borderBottom: i < 4 ? `1px solid ${skin.borderColor}40` : 'none' }}>
                  <td className="font-bold py-1.5" style={{ color: skin.primaryColor, width: '35%' }}>{label}</td>
                  <td className="py-1.5">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-3 pb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: skin.accentColor }}>
            {'>>>'} About Me {'<<<'}
          </h4>
          <p className="text-xs italic leading-relaxed" style={{ color: skin.textColor, opacity: 0.8 }}>
            hii im {username || 'ur name here'} !! i luv music &amp; changing my layout every 5 mins lol
            add me if u want 2 be in my top 8 !! pc4pc ?? comment 4 comment ??
            &lt;3 &lt;3 &lt;3
          </p>
        </div>
      </div>

      {/* Mood Selector */}
      <div
        className="skin-transition rounded overflow-hidden"
        style={{ background: skin.cardBg, border: skin.cardBorder }}
      >
        <div className="p-2 text-center" style={{ background: skin.headerGradient }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: skin.textColor }}>
            How r u feeling?
          </span>
        </div>
        <div className="p-2 grid grid-cols-4 gap-1">
          {MOODS.map((mood) => (
            <button
              key={mood.label}
              onClick={() => onMoodChange(mood.label)}
              className={`text-center p-1 rounded text-xs transition-all ${
                selectedMood === mood.label ? 'scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                background: selectedMood === mood.label ? `${skin.primaryColor}30` : 'transparent',
                border: selectedMood === mood.label ? `1px solid ${skin.primaryColor}` : '1px solid transparent',
              }}
              title={mood.label}
            >
              <span className="text-lg block">{mood.emoji}</span>
              <span style={{ color: skin.textColor, fontSize: '0.6rem' }}>{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Top 8 Friends */}
      <div
        className="skin-transition rounded overflow-hidden"
        style={{ background: skin.cardBg, border: skin.cardBorder }}
      >
        <div className="p-2 text-center" style={{ background: skin.headerGradient }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: skin.textColor }}>
            My Top 8
          </span>
        </div>
        <div className="top-8-grid p-2">
          {TOP_8_FRIENDS.map((friend, i) => (
            <div
              key={friend.name}
              className="text-center p-1 rounded cursor-pointer hover:scale-105 transition-transform fade-in-up"
              style={{
                background: `${skin.primaryColor}10`,
                border: `1px solid ${skin.borderColor}40`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <span className="text-xl block">{friend.avatar}</span>
              <span
                className="text-xs block truncate font-bold"
                style={{ color: skin.primaryColor, fontSize: '0.6rem' }}
              >
                {friend.name}
              </span>
              <span
                className="block truncate"
                style={{ color: skin.textColor, fontSize: '0.5rem', opacity: 0.6 }}
              >
                {friend.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PostWall({ skin, username }: { skin: Skin; username: string }) {
  const [posts, setPosts] = useState<Post[]>(DEFAULT_POSTS)
  const [newPost, setNewPost] = useState('')

  const handleSubmitPost = () => {
    if (!newPost.trim()) return

    const now = new Date()
    const timestamp = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

    const post: Post = {
      id: Date.now().toString(),
      author: username || 'Anonymous',
      avatar: '🌟',
      content: newPost,
      timestamp,
      mood: 'chillin',
    }

    setPosts([post, ...posts])
    setNewPost('')
  }

  const getMoodEmoji = (mood: string) => {
    const found = MOODS.find((m) => m.label === mood)
    return found ? found.emoji : '😎'
  }

  return (
    <div
      className="skin-transition rounded overflow-hidden"
      style={{
        background: skin.cardBg,
        border: skin.cardBorder,
        '--glow-color': skin.glowColor,
      } as CSSProperties}
    >
      <div className="p-3 text-center" style={{ background: skin.headerGradient }}>
        <h2
          className="text-sm font-bold uppercase tracking-widest text-glow"
          style={{
            color: skin.textColor,
            fontFamily: skin.fontFamily,
            '--glow-color': skin.glowColor,
          } as CSSProperties}
        >
          {'<<'} Bulletin Board {'>>'}
        </h2>
        <p className="text-xs opacity-70 mt-0.5" style={{ color: skin.textColor }}>
          Leave a comment!! pc4pc? c4c?
        </p>
      </div>

      {/* Post Input */}
      <div className="p-3" style={{ borderBottom: `1px solid ${skin.borderColor}40` }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="post something on the wall!! xD"
          className="retro-input w-full resize-none text-xs"
          style={{
            color: skin.textColor,
            fontFamily: skin.fontFamily,
            minHeight: '60px',
            '--glow-color': skin.glowColor,
          } as CSSProperties}
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmitPost()
            }
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs opacity-50" style={{ color: skin.textColor }}>
            posting as: <strong style={{ color: skin.primaryColor }}>{username || 'Anonymous'}</strong>
          </span>
          <button
            onClick={handleSubmitPost}
            className="retro-button glow-border"
            style={{
              background: skin.headerGradient,
              color: skin.textColor,
              borderColor: skin.primaryColor,
              '--glow-color': skin.glowColor,
            } as CSSProperties}
          >
            POST IT !!
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="max-h-96 overflow-y-auto retro-scrollbar">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="p-3 post-card fade-in-up"
            style={{
              borderBottom: `1px solid ${skin.borderColor}30`,
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">{post.avatar}</span>
              <div className="flex-1 min-w-0">
                <span
                  className="text-xs font-bold block truncate"
                  style={{ color: skin.primaryColor, fontFamily: skin.fontFamily }}
                >
                  {post.author}
                </span>
                <span className="text-xs opacity-40 block" style={{ color: skin.textColor, fontSize: '0.6rem' }}>
                  {post.timestamp}
                </span>
              </div>
              <span className="text-sm" title={post.mood}>{getMoodEmoji(post.mood)}</span>
            </div>
            <p
              className="text-xs leading-relaxed pl-8"
              style={{ color: skin.textColor, fontFamily: skin.fontFamily }}
            >
              {post.content}
            </p>
          </div>
        ))}
      </div>

      <div className="p-2 text-center" style={{ background: skin.headerGradient }}>
        <span className="text-xs" style={{ color: skin.textColor, opacity: 0.7 }}>
          {posts.length} messages on the wall
        </span>
      </div>
    </div>
  )
}

function RetroWidgets({ skin, currentTrack }: { skin: Skin; currentTrack: string }) {
  const [visitorCount, setVisitorCount] = useState(13371)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      )
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-3">
      {/* Visitor Counter */}
      <div
        className="skin-transition rounded overflow-hidden text-center"
        style={{ background: skin.cardBg, border: skin.cardBorder }}
      >
        <div className="p-2" style={{ background: skin.headerGradient }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: skin.textColor }}>
            Visitors
          </span>
        </div>
        <div className="p-3">
          <div className="hit-counter mx-auto">
            {visitorCount.toString().padStart(7, '0').split('').map((digit, i) => (
              <span key={i} className="counter-digit" style={{ color: skin.primaryColor }}>{digit}</span>
            ))}
          </div>
          <p className="text-xs mt-2 opacity-50" style={{ color: skin.textColor }}>
            You are visitor #{visitorCount}!
          </p>
        </div>
      </div>

      {/* Clock */}
      <div
        className="skin-transition rounded overflow-hidden text-center"
        style={{ background: skin.cardBg, border: skin.cardBorder }}
      >
        <div className="p-3">
          <div
            className="text-2xl font-bold text-glow font-mono"
            style={{ color: skin.primaryColor, '--glow-color': skin.glowColor } as CSSProperties}
          >
            {clock}
          </div>
          <p className="text-xs opacity-50 mt-1" style={{ color: skin.textColor }}>local time</p>
        </div>
      </div>

      {/* Currently Listening To */}
      <div
        className="skin-transition rounded overflow-hidden"
        style={{ background: skin.cardBg, border: skin.cardBorder }}
      >
        <div className="p-2 text-center" style={{ background: skin.headerGradient }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: skin.textColor }}>
            Currently Listening To
          </span>
        </div>
        <div className="p-3 text-center">
          <span className="text-lg">🎵</span>
          <p className="text-xs mt-1" style={{ color: skin.primaryColor, fontFamily: skin.fontFamily }}>
            {currentTrack || 'Select a track!'}
          </p>
          <div className="flex items-center justify-center gap-0.5 mt-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="eq-bar" style={{ backgroundColor: skin.accentColor }} />
            ))}
          </div>
        </div>
      </div>

      {/* Under Construction */}
      <div className="under-construction rounded">
        <div className="p-2 text-center rounded" style={{ background: skin.cardBg }}>
          <span className="text-lg">🚧</span>
          <p
            className="text-xs font-bold blink-text"
            style={{ color: '#FFD700', fontFamily: '"Comic Sans MS", cursive' }}
          >
            UNDER CONSTRUCTION
          </p>
          <span className="text-lg">🚧</span>
        </div>
      </div>

      {/* Shout Outs */}
      <div
        className="skin-transition rounded overflow-hidden"
        style={{ background: skin.cardBg, border: skin.cardBorder }}
      >
        <div className="p-2 text-center" style={{ background: skin.headerGradient }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: skin.textColor }}>
            Shout Outs
          </span>
        </div>
        <div className="p-3 space-y-2">
          {[
            { user: '~*PrInCeSs*~', msg: 'omg luv ur new layout!! so cute <3' },
            { user: 'sk8rboi_2007', msg: 'add me bro, ur page is sick' },
            { user: 'Tom', msg: 'thanks for being my friend!' },
          ].map((shout) => (
            <div key={shout.user} className="text-xs" style={{ color: skin.textColor, fontFamily: skin.fontFamily }}>
              <span style={{ color: skin.primaryColor }}>{shout.user}:</span>{' '}
              <span className="italic opacity-80">{shout.msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Made With Love */}
      <div className="text-center py-2">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs wobble-element"
          style={{
            border: `1px dashed ${skin.primaryColor}`,
            color: skin.textColor,
            fontFamily: '"Comic Sans MS", cursive',
          }}
        >
          made w/ {'<3'} in 2007
        </div>
      </div>

      {/* Web Badges */}
      <div className="flex flex-wrap justify-center gap-2">
        {['MySpace', 'AIM', 'Photobucket', 'Limewire'].map((badge) => (
          <span
            key={badge}
            className="text-xs px-2 py-0.5 rounded scale-pulse"
            style={{
              background: skin.headerGradient,
              color: skin.textColor,
              border: `1px solid ${skin.borderColor}`,
              fontSize: '0.6rem',
              fontWeight: 'bold',
            }}
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// MAIN APP
// ============================================================

function App() {
  const [currentSkin, setCurrentSkin] = useState<Skin>(SKINS[0])
  const [username, setUsername] = useState('xX_YourName_Xx')
  const [selectedMood, setSelectedMood] = useState('chillin')
  const [currentTrackTitle, setCurrentTrackTitle] = useState(TRACKS[0].title)

  const handleTrackChange = useCallback((track: Track) => {
    setCurrentTrackTitle(track.title)
  }, [])

  return (
    <div
      className="bulletin-board skin-transition scan-lines retro-scrollbar"
      style={{
        background: currentSkin.background,
        backgroundImage: currentSkin.backgroundImage,
        color: currentSkin.textColor,
        fontFamily: currentSkin.fontFamily,
        '--glow-color': currentSkin.glowColor,
      } as CSSProperties}
    >
      <FloatingParticles skin={currentSkin} />

      {/* Top Marquee Banner */}
      <div
        className="relative z-10 py-2 overflow-hidden"
        style={{
          background: currentSkin.headerGradient,
          borderBottom: `2px solid ${currentSkin.primaryColor}`,
        }}
      >
        <div className="marquee-text text-sm font-bold" style={{ color: currentSkin.textColor }}>
          {'★ '}Welcome 2 the Community Bulletin Board !! {'★ '}
          Change ur skin !! {'★ '}
          Leave a comment !! {'★ '}
          Add me 2 ur Top 8 !! {'★ '}
          PC4PC ?? C4C ?? {'★ '}
          This page is best viewed in Internet Explorer 6.0 {'★ '}
          Powered by MySpace {'★ '}
          {currentSkin.name} theme activated !! {'★ '}
        </div>
      </div>

      {/* Page Title */}
      <div className="relative z-10 text-center py-6 px-4">
        <h1
          className="text-3xl md:text-5xl font-bold mb-2 text-glow rainbow-text"
          style={{
            fontFamily: currentSkin.fontFamily,
            '--glow-color': currentSkin.glowColor,
            letterSpacing: '2px',
          } as CSSProperties}
        >
          {'~*~ '}Hi5 Remix{' ~*~'}
        </h1>
        <p className="text-lg mb-1" style={{ color: currentSkin.primaryColor, fontFamily: currentSkin.fontFamily }}>
          Community Bulletin Board
        </p>
        <p className="text-sm blink-text" style={{ color: currentSkin.accentColor }}>
          {'>> '}like its 2007 baby !!{' <<'}
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          {['✨', '💖', '🌟', '💎', '⭐', '💖', '✨'].map((emoji, i) => (
            <span key={i} className="sparkle-element text-lg" style={{ animationDelay: `${i * 0.2}s` }}>
              {emoji}
            </span>
          ))}
        </div>
        <div
          className="retro-divider mt-4 mx-auto max-w-md"
          style={{ '--glow-color': currentSkin.glowColor } as CSSProperties}
        />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <ProfileCard
              skin={currentSkin}
              selectedMood={selectedMood}
              onMoodChange={setSelectedMood}
              username={username}
              onUsernameChange={setUsername}
            />
          </div>

          {/* Center Content */}
          <div className="lg:col-span-6 space-y-4">
            {/* Announcement Banner */}
            <div
              className="rounded overflow-hidden glow-border"
              style={{
                background: currentSkin.cardBg,
                border: currentSkin.cardBorder,
                '--glow-color': currentSkin.glowColor,
              } as CSSProperties}
            >
              <div className="p-3 text-center" style={{ background: currentSkin.headerGradient }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: currentSkin.textColor }}>
                  Announcements
                </span>
              </div>
              <div className="p-3 text-center">
                <p
                  className="text-xs shake-element inline-block"
                  style={{ color: currentSkin.accentColor, fontFamily: currentSkin.fontFamily }}
                >
                  {'>>> '}NEW LAYOUTS ADDED !! Check out the skin selector on the right !!{' <<<'}
                </p>
                <div className="retro-divider my-2" style={{ '--glow-color': currentSkin.glowColor } as CSSProperties} />
                <p className="text-xs" style={{ color: currentSkin.textColor, opacity: 0.7 }}>
                  Rules: Be cool 2 each other !! No drama on the wall !! Add b4 u judge !!
                </p>
              </div>
            </div>

            <PostWall skin={currentSkin} username={username} />

            {/* Tags Section */}
            <div
              className="rounded overflow-hidden text-center py-4"
              style={{ background: currentSkin.cardBg, border: currentSkin.cardBorder }}
            >
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {['Peace', 'Love', 'MySpace', 'AIM', 'HTML', 'Hi5', 'CSS'].map((tag, i) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-bold bounce-element"
                    style={{
                      background: `${currentSkin.primaryColor}20`,
                      border: `1px solid ${currentSkin.primaryColor}`,
                      color: currentSkin.primaryColor,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3">
                <span className="text-xs" style={{ color: currentSkin.textColor, opacity: 0.5 }}>
                  {'<< '}Customize your experience with the skin selector{' >>'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <SkinSelector currentSkin={currentSkin} onSkinChange={setCurrentSkin} />
            <MusicPlayer skin={currentSkin} onTrackChange={handleTrackChange} />
            <RetroWidgets skin={currentSkin} currentTrack={currentTrackTitle} />
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div
        className="relative z-10 py-2 overflow-hidden"
        style={{
          background: currentSkin.headerGradient,
          borderTop: `2px solid ${currentSkin.primaryColor}`,
        }}
      >
        <div
          className="marquee-reverse text-xs"
          style={{ color: currentSkin.textColor }}
        >
          {'★ '}Thanks 4 visiting !! {'★ '}
          Dont forget 2 sign my guestbook !! {'★ '}
          Made with HTML and CSS !! {'★ '}
          Best viewed at 1024x768 {'★ '}
          Copyright 2007 {'★ '}
          Get ur own layout at pimp-my-profile.com {'★ '}
          Comment 4 Comment ?? {'★ '}
          Add me on AIM !! {'★ '}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-6 px-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          {['🌟', '💖', '✨', '💎', '✨', '💖', '🌟'].map((emoji, i) => (
            <span key={i} className="sparkle-element" style={{ animationDelay: `${i * 0.15}s` }}>
              {emoji}
            </span>
          ))}
        </div>
        <p className="text-xs" style={{ color: currentSkin.textColor, opacity: 0.4 }}>
          Hi5 Remix - Community Bulletin Board - Like its 2007
        </p>
        <p className="text-xs mt-1" style={{ color: currentSkin.textColor, opacity: 0.3 }}>
          Best viewed in Internet Explorer 6.0 at 1024x768
        </p>
        <p className="text-xs mt-1" style={{ color: currentSkin.textColor, opacity: 0.2 }}>
          Dont steal my layout !!
        </p>
      </div>
    </div>
  )
}

export default App
