'use client'

import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function NumberGuessingGameComponent() {
  const [targetNumber] = useState(() => Math.floor(Math.random() * 100) + 1)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('1から100までの数字を当ててください！')
  const [attempts, setAttempts] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const numberGuess = parseInt(guess)
    
    if (isNaN(numberGuess) || numberGuess < 1 || numberGuess > 100) {
      setMessage('1から100までの有効な数字を入力してください。')
      return
    }

    setAttempts(attempts + 1)

    if (numberGuess === targetNumber) {
      setMessage(`おめでとうございます！${attempts + 1}回で正解しました！`)
      setGameOver(true)
    } else if (numberGuess < targetNumber) {
      setMessage('もっと大きい数字です。')
    } else {
      setMessage('もっと小さい数字です。')
    }

    setGuess('')
  }

  const resetGame = () => {
    window.location.reload()
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>数当てゲーム</CardTitle>
        <CardDescription>1から100までの数字を当ててください</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{message}</p>
        {!gameOver && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="あなたの予想は？"
              min="1"
              max="100"
            />
            <Button type="submit" className="w-full">
              予想する
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter>
        <p>試行回数: {attempts}</p>
        {gameOver && (
          <Button onClick={resetGame} className="ml-auto">
            もう一度プレイ
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}