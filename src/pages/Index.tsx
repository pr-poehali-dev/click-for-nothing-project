import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface GameState {
  coins: number;
  clickPower: number;
  upgrades: Upgrade[];
  totalClicks: number;
  totalEarned: number;
  hotdogLevel: number;
  unlockedBackgrounds: string[];
  selectedBackground: string;
}

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  power: number;
  level: number;
  icon: string;
}

interface Player {
  name: string;
  score: number;
  clicks: number;
}

interface ChestType {
  id: string;
  name: string;
  price: number;
  rarity: string;
  icon: string;
  rewards: ChestReward[];
}

interface ChestReward {
  type: 'background' | 'coins';
  item: string;
  chance: number;
  amount?: number;
}

interface BackgroundItem {
  id: string;
  name: string;
  gradient: string;
  rarity: string;
  unlocked: boolean;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    coins: 0,
    clickPower: 1,
    upgrades: [
      { id: '1', name: 'Золотая горчица', description: 'Увеличивает прибыль за клик на 2', cost: 50, power: 2, level: 0, icon: 'Sparkles' },
      { id: '2', name: 'Турбо кетчуп', description: 'Увеличивает прибыль за клик на 5', cost: 200, power: 5, level: 0, icon: 'Zap' },
      { id: '3', name: 'Мега булочка', description: 'Увеличивает прибыль за клик на 10', cost: 500, power: 10, level: 0, icon: 'Crown' },
      { id: '4', name: 'Космический хотдог', description: 'Увеличивает прибыль за клик на 25', cost: 1000, power: 25, level: 0, icon: 'Rocket' },
    ],
    totalClicks: 0,
    totalEarned: 0,
    hotdogLevel: 1,
    unlockedBackgrounds: ['default'],
    selectedBackground: 'default'
  });

  const [clickAnimations, setClickAnimations] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [openingChest, setOpeningChest] = useState<string | null>(null);
  const [chestReward, setChestReward] = useState<ChestReward | null>(null);

  const [leaderboard] = useState<Player[]>([
    { name: 'ХотДог_Мастер', score: 15420, clicks: 3840 },
    { name: 'Клик_Чемпион', score: 12580, clicks: 2960 },
    { name: 'Горчичный_Король', score: 9850, clicks: 2210 },
    { name: 'Кетчуп_Легенда', score: 7640, clicks: 1890 },
    { name: 'Булочка_Про', score: 5920, clicks: 1456 },
  ]);

  const [chestTypes] = useState<ChestType[]>([
    {
      id: 'wooden',
      name: 'Деревянный сундук',
      price: 100,
      rarity: 'common',
      icon: 'Package',
      rewards: [
        { type: 'coins', item: '', chance: 60, amount: 50 },
        { type: 'background', item: 'ocean', chance: 25 },
        { type: 'background', item: 'forest', chance: 15 }
      ]
    },
    {
      id: 'golden',
      name: 'Золотой сундук',
      price: 500,
      rarity: 'rare',
      icon: 'Crown',
      rewards: [
        { type: 'coins', item: '', chance: 40, amount: 300 },
        { type: 'background', item: 'sunset', chance: 30 },
        { type: 'background', item: 'galaxy', chance: 20 },
        { type: 'background', item: 'rainbow', chance: 10 }
      ]
    },
    {
      id: 'diamond',
      name: 'Алмазный сундук',
      price: 2000,
      rarity: 'epic',
      icon: 'Gem',
      rewards: [
        { type: 'coins', item: '', chance: 30, amount: 1000 },
        { type: 'background', item: 'cosmic', chance: 25 },
        { type: 'background', item: 'neon', chance: 20 },
        { type: 'background', item: 'lava', chance: 15 },
        { type: 'background', item: 'legendary', chance: 10 }
      ]
    }
  ]);

  const [backgrounds] = useState<BackgroundItem[]>([
    { id: 'default', name: 'Обычный', gradient: 'from-game-mustard via-game-ketchup to-game-purple', rarity: 'common', unlocked: true },
    { id: 'ocean', name: 'Океан', gradient: 'from-blue-400 via-cyan-500 to-blue-600', rarity: 'common', unlocked: false },
    { id: 'forest', name: 'Лес', gradient: 'from-green-400 via-emerald-500 to-green-600', rarity: 'common', unlocked: false },
    { id: 'sunset', name: 'Закат', gradient: 'from-orange-400 via-red-500 to-pink-600', rarity: 'rare', unlocked: false },
    { id: 'galaxy', name: 'Галактика', gradient: 'from-purple-400 via-pink-500 to-indigo-600', rarity: 'rare', unlocked: false },
    { id: 'rainbow', name: 'Радуга', gradient: 'from-red-400 via-yellow-500 via-green-500 via-blue-500 to-purple-500', rarity: 'rare', unlocked: false },
    { id: 'cosmic', name: 'Космос', gradient: 'from-indigo-900 via-purple-900 to-pink-900', rarity: 'epic', unlocked: false },
    { id: 'neon', name: 'Неон', gradient: 'from-cyan-400 via-lime-400 to-yellow-400', rarity: 'epic', unlocked: false },
    { id: 'lava', name: 'Лава', gradient: 'from-red-600 via-orange-600 to-yellow-500', rarity: 'epic', unlocked: false },
    { id: 'legendary', name: 'Легендарный', gradient: 'from-yellow-400 via-amber-500 via-orange-500 to-red-500', rarity: 'legendary', unlocked: false }
  ]);

  const [donationOptions] = useState([
    { name: '☕ Кофе разработчику', price: '100₽', coins: 1000, description: 'Поддержи создателя игры!' },
    { name: '🎮 Геймер пак', price: '299₽', coins: 5000, description: 'Стартовый набор для быстрого старта' },
    { name: '👑 Премиум статус', price: '499₽', coins: 15000, description: 'Эксклюзивные бонусы и ускорения' },
  ]);

  useEffect(() => {
    const savedGame = localStorage.getItem('hotdog-clicker-save');
    if (savedGame) {
      setGameState(JSON.parse(savedGame));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hotdog-clicker-save', JSON.stringify(gameState));
  }, [gameState]);

  const handleHotdogClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newAnimation = { id: Date.now(), x, y };
    setClickAnimations(prev => [...prev, newAnimation]);
    
    setTimeout(() => {
      setClickAnimations(prev => prev.filter(anim => anim.id !== newAnimation.id));
    }, 1000);

    setGameState(prev => {
      const newTotalEarned = prev.totalEarned + prev.clickPower;
      const newLevel = Math.floor(newTotalEarned / 1000) + 1;
      
      return {
        ...prev,
        coins: prev.coins + prev.clickPower,
        totalClicks: prev.totalClicks + 1,
        totalEarned: newTotalEarned,
        hotdogLevel: newLevel
      };
    });
  };

  const handleUpgrade = (upgradeId: string) => {
    setGameState(prev => {
      const upgrade = prev.upgrades.find(u => u.id === upgradeId);
      if (!upgrade || prev.coins < upgrade.cost) return prev;

      return {
        ...prev,
        coins: prev.coins - upgrade.cost,
        clickPower: prev.clickPower + upgrade.power,
        upgrades: prev.upgrades.map(u => 
          u.id === upgradeId 
            ? { ...u, level: u.level + 1, cost: Math.floor(u.cost * 1.5) }
            : u
        )
      };
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getHotdogTitle = (level: number) => {
    if (level >= 100) return 'Легендарный Хотдог';
    if (level >= 50) return 'Эпический Хотдог';
    if (level >= 25) return 'Редкий Хотдог';
    if (level >= 10) return 'Необычный Хотдог';
    return 'Обычный Хотдог';
  };

  const openChest = async (chestId: string) => {
    const chest = chestTypes.find(c => c.id === chestId);
    if (!chest || gameState.coins < chest.price) return;

    setGameState(prev => ({ ...prev, coins: prev.coins - chest.price }));
    setOpeningChest(chestId);

    setTimeout(() => {
      const random = Math.random() * 100;
      let cumulativeChance = 0;
      
      for (const reward of chest.rewards) {
        cumulativeChance += reward.chance;
        if (random <= cumulativeChance) {
          if (reward.type === 'background' && reward.item) {
            setGameState(prev => ({
              ...prev,
              unlockedBackgrounds: [...prev.unlockedBackgrounds, reward.item]
            }));
          } else if (reward.type === 'coins' && reward.amount) {
            setGameState(prev => ({ ...prev, coins: prev.coins + reward.amount! }));
          }
          setChestReward(reward);
          break;
        }
      }
      
      setOpeningChest(null);
      setTimeout(() => setChestReward(null), 3000);
    }, 2000);
  };

  const changeBackground = (backgroundId: string) => {
    if (gameState.unlockedBackgrounds.includes(backgroundId)) {
      setGameState(prev => ({ ...prev, selectedBackground: backgroundId }));
    }
  };

  const selectedBg = backgrounds.find(bg => bg.id === gameState.selectedBackground) || backgrounds[0];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${selectedBg.gradient} p-4`}>
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg mb-4 animate-float">
            🌭 CLICK FOR NOTHING 🌭
          </h1>
          <div className="flex justify-center items-center gap-6 text-2xl font-semibold text-white">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              💰 {formatNumber(gameState.coins)} монет
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              ⚡ {gameState.clickPower} за клик
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              🎯 {formatNumber(gameState.totalClicks)} кликов
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              🌭 Ур.{gameState.hotdogLevel} - {getHotdogTitle(gameState.hotdogLevel)}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border-4 border-game-dark">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block">
                  <button
                    onClick={handleHotdogClick}
                    className="relative w-64 h-64 bg-gradient-to-br from-game-mustard to-game-ketchup rounded-full border-8 border-game-dark hover:scale-105 transition-transform duration-200 animate-pulse-click shadow-2xl"
                  >
                    <img 
                      src="/img/4bdd6721-6639-43b9-9a2a-6c06f17ee8a7.jpg" 
                      alt="Хотдог" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </button>
                  
                  {clickAnimations.map((anim) => (
                    <div
                      key={anim.id}
                      className="absolute text-2xl font-bold text-game-mustard animate-coin-bounce pointer-events-none"
                      style={{ left: anim.x, top: anim.y }}
                    >
                      +{gameState.clickPower}
                    </div>
                  ))}
                </div>
                
                <p className="text-xl text-game-dark mt-6 font-medium">
                  Кликай на хотдог и получай монеты! 🎯
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="upgrades" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="upgrades">Прокачка</TabsTrigger>
                <TabsTrigger value="chests">Сундуки</TabsTrigger>
                <TabsTrigger value="backgrounds">Фоны</TabsTrigger>
                <TabsTrigger value="leaderboard">Лидеры</TabsTrigger>
                <TabsTrigger value="donations">Донат</TabsTrigger>
              </TabsList>

              <TabsContent value="upgrades" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gameState.upgrades.map((upgrade) => (
                    <Card key={upgrade.id} className="bg-white/90 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-game-dark">
                          <Icon name={upgrade.icon as any} size={24} />
                          {upgrade.name}
                          {upgrade.level > 0 && (
                            <Badge variant="secondary">Ур. {upgrade.level}</Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{upgrade.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-game-dark">
                            💰 {formatNumber(upgrade.cost)}
                          </span>
                          <Button
                            onClick={() => handleUpgrade(upgrade.id)}
                            disabled={gameState.coins < upgrade.cost}
                            className="bg-game-ketchup hover:bg-game-ketchup/80"
                          >
                            Купить
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="chests" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {chestTypes.map((chest) => (
                    <Card key={chest.id} className="bg-white/90 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-game-dark">
                          <Icon name={chest.icon as any} size={24} />
                          {chest.name}
                          <Badge 
                            variant={chest.rarity === 'common' ? 'secondary' : 
                                   chest.rarity === 'rare' ? 'default' : 'destructive'}
                          >
                            {chest.rarity === 'common' ? 'Обычный' : 
                             chest.rarity === 'rare' ? 'Редкий' : 'Эпический'}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <img 
                            src="/img/e016051f-8d23-42c2-a343-914d2c359a53.jpg" 
                            alt={chest.name}
                            className="w-full h-24 object-cover rounded-lg mb-3"
                          />
                          <div className="text-xs space-y-1">
                            {chest.rewards.map((reward, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>
                                  {reward.type === 'coins' ? '💰 Монеты' : '🎨 Фон'}
                                </span>
                                <span className="text-gray-500">{reward.chance}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-game-dark">
                            💰 {formatNumber(chest.price)}
                          </span>
                          <Button
                            onClick={() => openChest(chest.id)}
                            disabled={gameState.coins < chest.price || openingChest === chest.id}
                            className="bg-game-purple hover:bg-game-purple/80"
                          >
                            {openingChest === chest.id ? 'Открываем...' : 'Открыть'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {chestReward && (
                  <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-4 border-yellow-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-2">🎉</div>
                      <h3 className="text-xl font-bold text-white mb-2">Поздравляем!</h3>
                      <p className="text-white">
                        {chestReward.type === 'coins' 
                          ? `Вы получили ${chestReward.amount} монет!`
                          : `Разблокирован новый фон: ${backgrounds.find(bg => bg.id === chestReward.item)?.name}!`
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="backgrounds" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {backgrounds.map((bg) => {
                    const isUnlocked = gameState.unlockedBackgrounds.includes(bg.id);
                    const isSelected = gameState.selectedBackground === bg.id;
                    
                    return (
                      <Card 
                        key={bg.id} 
                        className={`relative cursor-pointer transition-all hover:scale-105 ${
                          isSelected ? 'ring-4 ring-yellow-400' : ''
                        } ${!isUnlocked ? 'opacity-50' : ''}`}
                        onClick={() => changeBackground(bg.id)}
                      >
                        <CardContent className="p-3">
                          <div className={`w-full h-16 rounded-lg bg-gradient-to-r ${bg.gradient} mb-2`} />
                          <div className="text-center">
                            <div className="text-sm font-semibold text-game-dark">{bg.name}</div>
                            <Badge 
                              size="sm"
                              variant={bg.rarity === 'common' ? 'secondary' : 
                                     bg.rarity === 'rare' ? 'default' : 
                                     bg.rarity === 'epic' ? 'destructive' : 'outline'}
                            >
                              {bg.rarity === 'common' ? 'Обычный' : 
                               bg.rarity === 'rare' ? 'Редкий' : 
                               bg.rarity === 'epic' ? 'Эпический' : 'Легендарный'}
                            </Badge>
                          </div>
                          {!isUnlocked && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                              <Icon name="Lock" className="text-white" size={24} />
                            </div>
                          )}
                          {isSelected && (
                            <div className="absolute top-1 right-1">
                              <Icon name="Check" className="text-yellow-400" size={20} />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-4">
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-center text-game-dark">
                      🏆 Таблица лидеров
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboard.map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-game-mustard/20 to-game-ketchup/20 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                            </span>
                            <span className="font-semibold text-game-dark">
                              {player.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-game-dark">
                              {formatNumber(player.score)} монет
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatNumber(player.clicks)} кликов
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t-2 border-game-dark pt-3 mt-4">
                        <div className="flex items-center justify-between p-3 bg-game-purple/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🎯</span>
                            <span className="font-semibold text-game-dark">Вы</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-game-dark">
                              {formatNumber(gameState.coins)} монет
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatNumber(gameState.totalClicks)} кликов
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="donations" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {donationOptions.map((option, index) => (
                    <Card key={index} className="bg-white/90 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-center text-game-dark">
                          {option.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-3xl font-bold text-game-ketchup mb-2">
                          {option.price}
                        </div>
                        <div className="text-lg text-game-dark mb-3">
                          +{formatNumber(option.coins)} монет
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {option.description}
                        </p>
                        <Button className="w-full bg-game-purple hover:bg-game-purple/80">
                          Поддержать
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <p className="text-game-dark">
                      💝 Поддержка разработчика помогает улучшать игру и добавлять новые функции!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-game-dark">📊 Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Прогресс до следующего уровня</span>
                    <span>{Math.floor(((gameState.totalEarned % 1000) / 1000) * 100)}%</span>
                  </div>
                  <Progress value={(gameState.totalEarned % 1000) / 10} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Уровень хотдога</span>
                    <span>{gameState.hotdogLevel}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {getHotdogTitle(gameState.hotdogLevel)}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Общий уровень</span>
                    <span>{gameState.upgrades.reduce((sum, u) => sum + u.level, 0)}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Сумма всех улучшений
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span>КПД кликов</span>
                    <span>{gameState.totalClicks > 0 ? (gameState.coins / gameState.totalClicks).toFixed(1) : '0'}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Среднее монет за клик
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <h3 className="font-semibold text-game-dark mb-2">Важно!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Эта игра создана исключительно в развлекательных целях
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => window.open('/disclaimer', '_blank')}
                >
                  Подробнее →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;