import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-mustard via-game-ketchup to-game-purple p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
            ⚠️ ВАЖНАЯ ИНФОРМАЦИЯ
          </h1>
          <p className="text-xl text-white/80">
            О разработке и целях проекта "Click for Nothing"
          </p>
        </header>

        <div className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm border-4 border-game-dark">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-game-dark">
                <Icon name="Info" size={28} />
                Развлекательные цели
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg space-y-4">
              <p className="text-game-dark">
                🎮 <strong>Данная игра создана исключительно в развлекательных целях</strong> и представляет собой 
                демонстрацию возможностей веб-разработки на современных технологиях.
              </p>
              <p className="text-gray-700">
                Проект не имеет коммерческой направленности и не предназначен для получения 
                реальной финансовой выгоды от пользователей.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-game-dark">
                  <Icon name="Code" size={24} />
                  Технологии
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">React</Badge>
                    <span className="text-sm">Библиотека для создания интерфейсов</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600">TypeScript</Badge>
                    <span className="text-sm">Типизированный JavaScript</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-teal-500">Tailwind CSS</Badge>
                    <span className="text-sm">Утилитарные CSS стили</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500">Vite</Badge>
                    <span className="text-sm">Быстрый сборщик проектов</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-game-dark">
                  <Icon name="Target" size={24} />
                  Цели проекта
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Изучение React и современных веб-технологий</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Практика создания интерактивных интерфейсов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Демонстрация игровой механики кликеров</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Эксперименты с анимациями и эффектами</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-yellow-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-game-dark">
                <Icon name="AlertTriangle" size={24} />
                Отказ от ответственности
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-game-dark mb-2">⚠️ Важно понимать:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Все достижения и результаты в игре носят исключительно развлекательный характер</li>
                  <li>• Внутриигровая валюта не имеет реальной ценности</li>
                  <li>• Донатные функции представлены для демонстрации и не активны</li>
                  <li>• Сохранения хранятся локально в браузере пользователя</li>
                  <li>• Таблица лидеров содержит вымышленные данные</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-game-dark mb-2">💡 Образовательная ценность:</h4>
                <p className="text-sm text-gray-700">
                  Проект демонстрирует принципы создания современных веб-приложений, 
                  работу с состоянием, локальным хранилищем, анимациями и адаптивным дизайном.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-game-dark">
                <Icon name="Users" size={24} />
                Контакты и поддержка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-game-dark mb-4">
                Если у вас есть вопросы о технической реализации проекта или предложения 
                по улучшению, вы можете связаться с разработчиком:
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Icon name="Github" size={16} />
                  GitHub
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  Email
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  Telegram
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-game-ketchup hover:bg-game-ketchup/80 text-white px-8 py-3"
              onClick={() => window.history.back()}
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Вернуться к игре
            </Button>
          </div>

          <div className="text-center text-white/60 text-sm">
            <p>© 2024 Click for Nothing - Образовательный проект</p>
            <p>Создано с ❤️ для изучения веб-разработки</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;