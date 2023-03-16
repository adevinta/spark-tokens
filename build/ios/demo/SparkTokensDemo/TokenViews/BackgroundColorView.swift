//
//  BackgroundView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI
import SparkTokens

struct BackgroundRow: View {
    var label: String
    var color: Color
    
    var body: some View {
        HStack {
            ZStack {
                Rectangle()
                    .fill(color)
                    .frame(width: 50, height: 50)
            }.border(Color.brandPrimary, width: Size.borderWidthSm)
            VStack(alignment: .leading) {
                Text(label)
            }
            .padding(.leading, Size.paddingMd)
            Spacer()
        }.padding(Size.paddingMd)
    }
}

struct BackgroundColorView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    Group {
                        BackgroundRow(label:"Primary", color:Color.brandPrimary)
                        BackgroundRow(label:"Secondary", color:Color.brandSecondary)
                    }
                    Group {
                        BackgroundRow(label:"Success", color:Color.brandSuccess)
                        BackgroundRow(label:"Alert", color:Color.brandAlert)
                        BackgroundRow(label:"Error", color:Color.brandError)
                        BackgroundRow(label:"Info", color:Color.brandInfo)
                        BackgroundRow(label:"Neutral", color:Color.brandNeutral)
                    }
                }
            }
        }
        .navigationBarTitle("Background Colors")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandOnPrimary)
    }
}

struct BackgroundColorView_Previews: PreviewProvider {
    static var previews: some View {
        BackgroundColorView()
    }
}

